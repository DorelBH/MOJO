const express = require('express');
const eventsController = require ('../controllers/event-controllers');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/newEvent', authenticateToken,eventsController.getUserName);


module.exports = router;
