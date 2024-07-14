const express = require('express');
const eventsController = require ('../controllers/event-controllers');
const authenticateToken = require('../middleware/authMiddleware');

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

router.post('/addTasks/:eventId', authenticateToken, eventsController.addTasksToEvent);
router.patch('/updateTaskCompletion/:eventId', authenticateToken, eventsController.updateTaskCompletion);

module.exports = router;
