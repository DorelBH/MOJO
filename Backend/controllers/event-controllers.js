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
        const { eventType, groomName, brideName, name, amountInvited, selectedDate, selectedRegions } = req.body;

        validateEventType(eventType);
        validateAmountInvited(amountInvited);

        const eventData = {
            eventType,
            amountInvited,
            selectedRegions,
            userId: req.user.userId 
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

exports.getEvent = getEvent;
exports.getUserName = getUserName;
exports.newEvent=newEvent;