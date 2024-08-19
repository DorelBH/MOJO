const Event = require('../models/event');
const User = require('../models/user');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
require('moment/locale/he'); 

const { sendSMS } = require('./sendSMS');
const { validateEventType, validateAmountInvited, validateEventFields } = require('./validationController.js');

const getUserName = async (req, res, next) => {
    try {
        const userData = req.user;
        res.json({ username: userData.username });
    } catch (err) {
        res.status(500).json({ message: err.message || 'לא הצלחנו להשיג את פרטי המשתמש' });
    }
};

const newEvent = async (req, res, next) => {
    try {
        const { eventType, groomName, brideName, name, amountInvited, selectedDate, selectedRegions, costs, checkLists } = req.body;
        
        // ביצוע בדיקות תקינות
        validateEventType(eventType);
        validateAmountInvited(amountInvited);
        validateEventFields(eventType, groomName, brideName, name);

        // בדיקת תאריך
        if (selectedDate) {
            const eventDate = new Date(selectedDate);
            if (eventDate < new Date()) {
                return res.status(400).json({ message: "תאריך האירוע לא יכול להיות בעבר." });
            }
        }

        // הכנת נתוני האירוע
        const eventData = {
            eventType,
            amountInvited,
            selectedRegions,
            userId: req.user.userId,
            costs,
            checkLists
        };

        if (eventType === "חתונה" || eventType === "חינה") {
            eventData.groomName = groomName;
            eventData.brideName = brideName;
        } else {
            eventData.name = name;
        }

        if (selectedDate) {
            eventData.eventDate = selectedDate;
        }

        // יצירת ושמירת האירוע
        const createdEvent = new Event(eventData);
        await createdEvent.save();

        // עדכון פרטי המשתמש עם האירוע החדש
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "לא נמצא משתמש." });
        }
        user.events.push(createdEvent);
        await user.save();

        // החזרת תגובת הצלחה
        res.status(201).json({ message: "האירוע נוצר בהצלחה", event: createdEvent });
    } catch (error) {
        // טיפול בשגיאות
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => {
                switch (err.path) {
                    case 'selectedRegions.0':
                        return 'יש לבחור אזור לאירוע.';
                    default:
                        return err.message; 
                }
            });

            return res.status(400).json({ message: validationErrors.join(' ') });
        }
        res.status(500).json({ message: "אירעה שגיאה פנימית בעת יצירת האירוע", error: error.message });
    }
};

const getEvent = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const userExists = await User.findById(userId);

        if (!userExists) {
            return res.status(404).json({ message: "לא נמצא משתמש." });
        }

        const events = await Event.find({ userId: userId });

        res.json({ events: events });
    } catch (err) {
        res.status(500).json({ message: err.message || "אירעה שגיאה בעת שליפת האירועים." });
    }
};

const deleteEvent = async (req, res) => {
    const eventId = req.params.eventId;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'האירוע לא נמצא' });
        }

        if (!req.user || !req.user.userId) {
            return res.status(403).json({ message: 'לא מורשה' });
        }

        if (!event.userId) {
            return res.status(500).json({ message: 'שגיאת שלמות האירוע' });
        }

        if (event.userId.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ message: 'אין לך הרשאה למחוק את האירוע הזה' });
        }

        await Event.findByIdAndDelete(eventId); 
        await User.updateOne({ _id: event.userId }, { $pull: { events: eventId } });
        res.json({ message: 'האירוע נמחק בהצלחה' });
    } catch (error) {
        console.error(`נכשל מחיקת האירוע עם ID: ${eventId}, שגיאה: ${error.message}`);
        res.status(500).json({ message: 'נכשלנו במחיקת האירוע' });
    }
};

const getSpecificEvent = async (req, res, next) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);
        
        if (!event) {
            return res.status(404).json({ message: 'האירוע לא נמצא' });
        }

        if (event.userId.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ message: 'אין לך הרשאה לגשת לאירוע הזה' });
        }

        res.json({ event });
    } catch (err) {
        res.status(500).json({ message: err.message || "אירעה שגיאה בעת שליפת האירוע." });
    }
};

const addPhoto = async (req, res) => {
    const eventId = req.params.eventId;
    const { photoUri } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ message: "האירוע לא נמצא." });
        }
    
        event.photo = photoUri; 
        await event.save();
        res.status(200).json({ message: "כתובת התמונה נוספה בהצלחה", event });
      } catch (error) {
        console.error('שגיאה בהוספת כתובת התמונה:', error);
        res.status(500).json({ message: "נכשל בהוספת כתובת התמונה", error: error.message });
      }
};

const updateEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const { groomName, brideName, name, amountInvited, selectedDate, selectedRegions } = req.body;

    try {
        // אימות התאריך
        if (selectedDate && new Date(selectedDate) < new Date()) {
            return res.status(400).json({ message: "תאריך האירוע לא יכול להיות בעבר." });
        }

        // אימות שדות
        validateEventType(req.body.eventType);
        validateAmountInvited(amountInvited);
        validateEventFields(req.body.eventType, groomName, brideName, name);

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "האירוע לא נמצא." });
        }

        // עדכון שדות האירוע בהתאם לסוג האירוע
        if (event.eventType === "חתונה" || event.eventType === "חינה") {
            event.groomName = groomName;
            event.brideName = brideName;
        } else {
            event.name = name;
        }

        event.amountInvited = amountInvited;
        event.eventDate = selectedDate;
        event.selectedRegions = selectedRegions;

        await event.save();
        res.status(200).json({ message: "האירוע עודכן בהצלחה", event });
    } catch (error) {
        // טיפול בשגיאות
        res.status(500).json({ message: error.message || "נכשלנו בעדכון האירוע." });
    }
};

const addCostsToEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const { costs } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "האירוע לא נמצא" });
        }

        for (const newCost of costs) {
            const existingCost = event.costs.find(cost => cost.label === newCost.label);
            if (existingCost) {
                return res.status(400).json({ message:`עלות עם התווית '${newCost.label}' כבר קיימת.`});
            }
            event.costs.push(newCost);
        }

        await event.save();
        res.status(200).json({ message: "כל העלויות החדשות נוספו בהצלחה", event });
    } catch (error) {
        res.status(500).json({ message: error.message || "נכשל בעדכון העלויות" });
    }
};

const updateCostsInEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const { index, newCostData } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "האירוע לא נמצא" });
        }

        if (index < 0 || index >= event.costs.length) { 
            return res.status(404).json({ message: "אינדקס עלות מחוץ לתחום" });
        }              

        event.costs[index] = { ...event.costs[index], ...newCostData };
        await event.save();
        res.status(200).json({ message: "העלות עודכנה בהצלחה", event });
    } catch (error) {
        res.status(500).json({ message: error.message || "נכשל בעדכון העלות" });
    }
};

const deleteCostInEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const { index } = req.body; 

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "האירוע לא נמצא" });
        }

        if (index < 0 || index >= event.costs.length) {
            return res.status(404).json({ message: "אינדקס עלות מחוץ לתחום" });
        }

        event.costs.splice(index, 1);
        await event.save();
        res.status(200).json({ message: "העלות נמחקה בהצלחה", event });
    } catch (error) {
        console.error(`נכשלנו במחיקת עלות עם ID: ${eventId}, שגיאה: ${error.message}`);
        res.status(500).json({ message: 'נכשלנו במחיקת העלות' });
    }
};

const addTasksToEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const { checkLists } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "האירוע לא נמצא" });
        }

        for (const newTask of checkLists) {
            const existingCheckList = event.checkLists.find(
                checkList => checkList.timeframe === newTask.timeframe
            );

            if (!newTask.timeframe || newTask.tasks.some(task => !task.label)) {
                return res.status(400).json({ message: "זמן המשימה והתווית לא יכולים להיות ריקים." });
            }

            if (existingCheckList) {
                for (const task of newTask.tasks) {
                    const existingTask = existingCheckList.tasks.find(t => t.label === task.label);
                    if (existingTask) {
                        return res.status(400).json({
                            message: `משימה "${task.label}" כבר קיימת במסגרת הזמן "${newTask.timeframe}".`
                        });
                    }
                }

                existingCheckList.tasks.push(...newTask.tasks);
            } else {
                event.checkLists.push(newTask);
            }
        }

        await event.save();
        res.status(200).json({ message: "כל המשימות החדשות נוספו בהצלחה", event });
    } catch (error) {
        res.status(500).json({ message: error.message || "נכשלנו בעדכון רשימת המשימות" });
    }
};

const updateTaskCompletion = async (req, res) => {
    const eventId = req.params.eventId;
    const { timeframe, label, completed } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "האירוע לא נמצא" });
        }

        const checkList = event.checkLists.find(
            checkList => checkList.timeframe === timeframe
        );

        if (!checkList) {
            return res.status(404).json({ message: "מסגרת הזמן לא נמצאה" });
        }

        const task = checkList.tasks.find(t => t.label === label);

        if (!task) {
            return res.status(404).json({ message: "המשימה לא נמצאה" });
        }

        task.completed = completed;

        await event.save();
        res.status(200).json({ message: "המשימה עודכנה בהצלחה", event });
    } catch (error) {
        res.status(500).json({ message: error.message || "נכשלנו בעדכון סטטוס המשימה" });
    }
};

const addGuestToEvent = async (req, res) => {
    const eventId = req.params.eventId;
    let { name, phone } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "האירוע לא נמצא" });
        }

        // עיצוב מספר הטלפון לפורמט הנכון
        phone = phone.replace(/[\s+-]/g, '');

        if (phone.startsWith('0')) {
            phone = '972' + phone.slice(1); // אם המספר מתחיל באפס, הוסף את קידומת 972
        } else if (!phone.startsWith('972')) {
            phone = '972' + phone; // אם המספר אינו כולל את קידומת 972, הוסף אותה
        }

        // בדיקה אם מספר הטלפון כבר קיים ברשימת האורחים
        const guestExists = event.guests.some(guest => guest.phone === phone);
        if (guestExists) {
            return res.status(400).json({ message: "מספר הטלפון כבר קיים ברשימת האורחים" });
        }

        // הוספת אורח חדש עם invited true
        event.guests.push({ name, phone, invited: true });
        await event.save();

        res.status(200).json({ message: "האורח נוסף בהצלחה", event });
    } catch (error) {
        res.status(500).json({ message: error.message || "נכשלנו בהוספת האורח" });
    }
};

const getEventGuests = async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "האירוע לא נמצא" });
        }

        res.status(200).json({ guests: event.guests });
    } catch (error) {
        res.status(500).json({ message: error.message || "נכשלנו בשליפת האורחים" });
    }
};

const removeGuestFromEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const phone = req.params.phone;

    if (!phone) {
        return res.status(400).json({ message: "מספר טלפון חובה" });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "האירוע לא נמצא" });
        }
       
        const guestIndex = event.guests.findIndex(guest => guest.phone === phone);
        if (guestIndex === -1) {
            return res.status(404).json({ message: "האורח לא נמצא ברשימה" });
        }

        event.guests.splice(guestIndex, 1);
        await event.save();

        res.status(200).json({ message: "האורח הוסר בהצלחה", event });
    } catch (error) {
        console.error(`נכשלנו בהסרת אורח עם מספר: ${phone}, שגיאה: ${error.message}`);
        res.status(500).json({ message: error.message || "נכשלנו בהסרת האורח" });
    }
};

const addPaymentDeadlinesToEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const { paymentDeadlines } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "האירוע לא נמצא." });
        }

        for (const newDeadline of paymentDeadlines) {
            if (!newDeadline.supplierName || !newDeadline.date) {
                return res.status(400).json({ message: "שם הספק ותאריך לא יכולים להיות ריקים." });
            }

            const existingDeadline = event.paymentDeadlines.find(
                deadline => deadline.supplierName === newDeadline.supplierName && new Date(deadline.date).getTime() === new Date(newDeadline.date).getTime()
            );

            if (existingDeadline) {
                return res.status(400).json({
                    message: `מועד התשלום לספק "${newDeadline.supplierName}" בתאריך "${newDeadline.date}" כבר קיים.`
                });
            }

            event.paymentDeadlines.push(newDeadline);
        }

        await event.save();
        res.status(200).json({ message: "כל מועדי התשלום החדשים נוספו בהצלחה", event });
    } catch (error) {
        res.status(500).json({ message: error.message || "הוספת מועדי התשלום נכשלה." });
    }
};


const updatePaymentDeadlineCompletion = async (req, res) => {
    const eventId = req.params.eventId;
    const { supplierName, date, completed } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "האירוע לא נמצא" });
        }

        const deadline = event.paymentDeadlines.find(
            deadline => deadline.supplierName === supplierName && new Date(deadline.date).getTime() === new Date(date).getTime()
        );

        if (!deadline) {
            return res.status(404).json({ message: "מועד התשלום לא נמצא" });
        }

        deadline.completed = completed;

        await event.save();
        res.status(200).json({ message: "מועד התשלום עודכן בהצלחה", event });
    } catch (error) {
        res.status(500).json({ message: error.message || "עדכון סטטוס מועד התשלום נכשל" });
    }
};

const getProviders = async (req, res) => {
    try {
        const { providerType } = req.params; 
        const filePath = path.join(__dirname, `../Crawler/${providerType}/providers.json`);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'קובץ הספקים לא נמצא' });
        }

        const data = fs.readFileSync(filePath, 'utf8');
        const providers = JSON.parse(data);
        res.json(providers);
    } catch (err) {
        console.error('שגיאה בקריאת הספקים:', err.message); 
        res.status(500).json({ message: 'נכשלנו בשליפת הספקים', error: err.message });
    }
};

const notifyGuests = async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'האירוע לא נמצא' });
        }
        const formattedDate = moment(event.eventDate).format('LL');

        const guests = event.guests;
        const smsPromises = guests.map(async (guest) => {
            if (guest.phone) {
                const phone = guest.phone;
                const guestId = guest._id; // מזהה ייחודי של האורח ממאגר הנתונים
                const link = `https://mojo-wdh6.onrender.com/rsvp?eventId=${eventId}&guestId=${guestId}`;
                let text = `שלום ${guest.name}, אתם מוזמנים ל${event.eventType} של ${event.name} ב-${formattedDate}. אנא אשרו הגעתכם בלינק הבא: ${link}`;
 
                if (event.eventType === 'חתונה' || event.eventType === 'חינה') {
                    text = `שלום ${guest.name}, אתם מוזמנים ל${event.eventType} של ${event.groomName} ו-${event.brideName} ב-${formattedDate}. אנא אשרו הגעתכם בלינק הבא: ${link}`;
                }

                try {
                    await sendSMS(phone, text);
                } catch (err) {
                    console.error(`שגיאה בשליחת SMS ל-${phone}:`, err.message);
                    throw new Error(`נכשלנו בשליחת SMS ל-${phone}`);
                }
            }
        });

        await Promise.all(smsPromises);

        res.status(200).json({ message: 'האורחים עודכנו בהצלחה' });
    } catch (error) {
        console.error('שגיאה בעדכון האורחים:', error);
        res.status(500).json({ message: 'שגיאה בעדכון האורחים', error: error.message });
    }
};

const rsvpResponse = async (req, res) => {
    const { eventId, guestId, attendance, numAttendees } = req.body;

    console.log('Received RSVP:', { eventId, guestId, attendance, numAttendees });

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            console.error(`האירוע לא נמצא עבור ID: ${eventId}`);
            return res.status(404).json({ message: 'האירוע לא נמצא' });
        }

        const guest = event.guests.id(guestId);
        if (!guest) {
            console.error(`האורח לא נמצא עבור ID: ${guestId} באירוע עם ID: ${eventId}`);
            return res.status(404).json({ message: 'האורח לא נמצא' });
        }

        // שמירת מספר האורחים או 0 אם לא מגיעים
        const attendeesCount = attendance === 'yes' ? parseInt(numAttendees, 10) || 0 : 0;
        guest.response = attendeesCount;

        await event.save();

        console.log(`RSVP עודכן בהצלחה עבור האורח: ${guestId}`);
        res.status(200).json({ message: 'RSVP עודכן בהצלחה' });
    } catch (error) {
        console.error('שגיאה בעדכון RSVP:', error);
        res.status(500).json({ message: 'נכשלנו בעדכון RSVP' });
    }
};

exports.rsvpResponse = rsvpResponse;

exports.notifyGuests = notifyGuests;
exports.addPaymentDeadlinesToEvent = addPaymentDeadlinesToEvent;
exports.updatePaymentDeadlineCompletion = updatePaymentDeadlineCompletion;
exports.removeGuestFromEvent = removeGuestFromEvent;
exports.addGuestToEvent = addGuestToEvent;
exports.getEventGuests = getEventGuests;
exports.getProviders = getProviders;

exports.addPhoto = addPhoto;
exports.addTasksToEvent = addTasksToEvent;
exports.updateTaskCompletion = updateTaskCompletion;
exports.addCostsToEvent = addCostsToEvent;
exports.updateCostsInEvent = updateCostsInEvent;
exports.deleteCostInEvent = deleteCostInEvent;
exports.getSpecificEvent = getSpecificEvent;
exports.deleteEvent = deleteEvent;
exports.getEvent = getEvent;
exports.getUserName = getUserName;
exports.newEvent = newEvent;
exports.updateEvent = updateEvent;
