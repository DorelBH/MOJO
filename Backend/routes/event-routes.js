const express = require('express');
const eventsController = require('../controllers/event-controllers');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/newEvent', authenticateToken, eventsController.getUserName);
router.post('/editEvent', authenticateToken, eventsController.newEvent);
router.get('/getEvent', authenticateToken, eventsController.getEvent);
router.delete('/deleteEvent/:eventId', authenticateToken, eventsController.deleteEvent);

router.get('/getEvent/:eventId', authenticateToken, eventsController.getSpecificEvent);

router.post('/addPhoto/:eventId', authenticateToken, eventsController.addPhoto);

router.post('/addCosts/:eventId', authenticateToken, eventsController.addCostsToEvent);
router.patch('/updateCosts/:eventId', authenticateToken, eventsController.updateCostsInEvent);
router.delete('/deleteCost/:eventId', authenticateToken, eventsController.deleteCostInEvent);

router.post('/addTasks/:eventId', authenticateToken, eventsController.addTasksToEvent);
router.patch('/updateTaskCompletion/:eventId', authenticateToken, eventsController.updateTaskCompletion);

router.post('/addDeadlines/:eventId', authenticateToken, eventsController.addPaymentDeadlinesToEvent);
router.patch('/updateDeadlines/:eventId', authenticateToken, eventsController.updatePaymentDeadlineCompletion);

router.patch('/updateEvent/:eventId', authenticateToken, eventsController.updateEvent);
router.post('/addGuest/:eventId', authenticateToken, eventsController.addGuestToEvent);
router.get('/getGuests/:eventId', authenticateToken, eventsController.getEventGuests);
router.delete('/removeGuest/:eventId', authenticateToken, eventsController.removeGuestFromEvent);
router.post('/notifyGuests/:eventId', authenticateToken, eventsController.notifyGuests);
//router.patch('/updateGuestResponse/:eventId', authenticateToken, eventsController.updateGuestResponse);

router.post('/smsWebhook', eventsController.updateGuestResponseFromSMS);

router.get('/providers/:providerType', authenticateToken, eventsController.getProviders);

module.exports = router;
