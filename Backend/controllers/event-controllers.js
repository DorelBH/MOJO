const Event = require('../models/event');
const User = require('../models/user');
const { validateEventType, validateAmountInvited } = require('./validationController.js');


const getUserName = async (req, res, next) => {
    try {
        const userData = req.user;
        
        res.json({ username: userData.username });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Failed to get user data' });
    }
};

const newEvent = async (req, res, next) => {
    try {
        const { eventType, groomName, brideName, name, amountInvited, selectedDate, selectedRegions,costs} = req.body;

        validateEventType(eventType);
        validateAmountInvited(amountInvited);

        const eventData = {
            eventType,
            amountInvited,
            selectedRegions,
            userId: req.user.userId,
            costs
        };

        if (eventType === "חתונה" || eventType === "חינה") {
            eventData.groomName = groomName;
            eventData.brideName = brideName;
        } else {
            eventData.name = name;
        }
        
        if (selectedDate) {
            eventData.eventDate = selectedDate;
            console.log("Received event data:", req.body);
        }

        const createdEvent = new Event(eventData);
        await createdEvent.save();

        // חיפוש המשתמש המתאים ועדכון מערך האירועים שלו
        const user = await User.findById(req.user.userId);
        user.events.push(createdEvent);
        await user.save();

        res.status(201).json({ message: "Event created successfully", event: createdEvent });
    } catch (error) {
        res.status(500).json({ message: "Failed to create event", error: error.message });
    }
};

const getEvent = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const userExists = await User.findById(userId );

        if (!userExists) {
            return res.status(404).json({ message: "User not found." });
        }

        const events = await Event.find({ userId: userId });

        res.json({ events: events });
            } catch (err) {
                res.status(500).json({ message: err.message || "An error occurred while retrieving the events." });
            }
};

const deleteEvent = async (req, res) => {
    const eventId = req.params.eventId;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!req.user || !req.user.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (!event.userId) {
            return res.status(500).json({ message: 'Event integrity error' });
        }

        if (event.userId.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await Event.findByIdAndDelete(eventId); 
        await User.updateOne({ _id: event.userId }, { $pull: { events: eventId } });
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(`Failed to delete event with ID: ${eventId}, Error: ${error.message}`);
        res.status(500).json({ message: 'Failed to delete event' });
    }
};

const getSpecificEvent = async (req, res, next) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // נבדוק אם המשתמש רשאי לגשת לאירוע זה
        if (event.userId.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to access this event' });
        }

        res.json({ event });
    } catch (err) {
        res.status(500).json({ message: err.message || "An error occurred while retrieving the event." });
    }
};

const addPhoto = async (req, res) => {
    const eventId = req.params.eventId;
    const { photoUri } = req.body; 

    try {
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ message: "Event not found." });
        }
    
        event.photo = photoUri; // עדכון ה-URI במסד הנתונים
        await event.save();
        res.status(200).json({ message: "Photo URI added successfully", event });
      } catch (error) {
        console.error('Error adding photo URI:', error);
        res.status(500).json({ message: "Failed to add photo URI", error: error.message });
      }
};



//COST - CALCULATOR 

const addCostsToEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const { costs } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        for (const newCost of costs) {
            const existingCost = event.costs.find(cost => cost.label === newCost.label);
            if (existingCost) {
                return res.status(400).json({ message:`Cost with label '${newCost.label}' already exists.`});
            }
            event.costs.push(newCost);
        }

        await event.save();
        res.status(200).json({ message: "All new costs added successfully", event });
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to update costs" });
    }
};

const updateCostsInEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const { index, newCostData,} = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (index < 0 || index >= event.costs.length) { // Ensure index is within bounds
            return res.status(404).json({ message: "Cost index out of bounds" });
        }              

        // Proceed with updating
        event.costs[index] = { ...event.costs[index], ...newCostData };
        await event.save();
        res.status(200).json({ message: "Cost updated successfully", event });
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to update cost" });
    }
};

const deleteCostInEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const { index } = req.body; // קודם השתמשת ב-key, עכשיו אנחנו משתמשים ב-index

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (index < 0 || index >= event.costs.length) {
            return res.status(404).json({ message: "Cost index out of bounds" });
        }

        // מחיקת העלות על פי האינדקס במערך
        event.costs.splice(index, 1);
        await event.save();
        res.status(200).json({ message: "Cost deleted successfully", event });
    } catch (error) {
        console.error(`Failed to delete cost with ID: ${eventId}, Error: ${error.message}`);
        res.status(500).json({ message: 'Failed to delete cost' });
    }
};





exports.addPhoto=addPhoto;


exports.addCostsToEvent=addCostsToEvent;
exports.updateCostsInEvent=updateCostsInEvent;
exports.deleteCostInEvent=deleteCostInEvent;

exports.getSpecificEvent = getSpecificEvent;
exports.deleteEvent=deleteEvent;
exports.getEvent = getEvent;
exports.getUserName = getUserName;
exports.newEvent=newEvent;