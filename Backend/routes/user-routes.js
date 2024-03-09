const express = require('express');
const usersController = require ('../controllers/user-controllers');

const router = express.Router();

router.post('/signup', usersController.signup);
router.post('/confirmEmail', usersController.confirmEmail); 

module.exports = router;
