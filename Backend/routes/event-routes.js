const express = require('express');
const eventsController = require ('../controllers/event-controllers');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/newEvent', authenticateToken,eventsController.getUserName);
router.post('/editEvent', authenticateToken,eventsController.newEvent);
router.get('/getEvent', authenticateToken,eventsController.getEvent);
router.delete('/deleteEvent/:eventId', authenticateToken, eventsController.deleteEvent);
router.get('/getEvent/:eventId', authenticateToken, eventsController.getSpecificEvent);

module.exports = router;
