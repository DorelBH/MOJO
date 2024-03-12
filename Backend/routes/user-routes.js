const express = require('express');
const usersController = require ('../controllers/user-controllers');

const router = express.Router();

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.post('/confirmEmail', usersController.confirmEmail); 
router.post('/resendVerificationCode', usersController.resendVerificationCode);
router.post('/resetPassword', usersController.resetPassword); 
router.post('/verifyUsername', usersController.verifyUsername); 

module.exports = router;
