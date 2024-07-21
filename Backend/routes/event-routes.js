const express = require('express');
const eventsController = require ('../controllers/event-controllers');
const authenticateToken = require('../middleware/authMiddleware');
const sendingSMS = require('../controllers/sendSMS');
const router = express.Router();

router.get('/newEvent', authenticateToken,eventsController.getUserName);
router.post('/editEvent', authenticateToken,eventsController.newEvent);
router.get('/getEvent', authenticateToken,eventsController.getEvent);
router.delete('/deleteEvent/:eventId', authenticateToken, eventsController.deleteEvent);

router.get('/getEvent/:eventId', authenticateToken, eventsController.getSpecificEvent);

router.post('/addPhoto/:eventId', authenticateToken,eventsController.addPhoto);

router.post('/addCosts/:eventId', authenticateToken, eventsController.addCostsToEvent);
router.patch('/updateCosts/:eventId', authenticateToken, eventsController.updateCostsInEvent);
router.delete('/deleteCost/:eventId', authenticateToken, eventsController.deleteCostInEvent);

router.post('/addGuest/:eventId', authenticateToken, eventsController.addGuestToEvent);
router.get('/getGuests/:eventId', authenticateToken, eventsController.getEventGuests);
router.delete('/removeGuest/:eventId', authenticateToken, eventsController.removeGuestFromEvent);

router.post('/notifyGuests/:eventId', authenticateToken, sendingSMS.notifyGuests);


module.exports = router;
