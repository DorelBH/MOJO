const User = require('../models/user');
const { sendVerificationEmail, sendPasswordResetEmail } = require('./email-service');
const { validateUsername, validateEmail, validatePassword, validatePasswordMatch } = require('./validationController.JS');

const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
};

const signup = async (req, res, next) => {
    const { username, email, password, passwordRepeat } = req.body;

    try {
        validateUsername(username);
        validateEmail(email);
        validatePassword(password);
        validatePasswordMatch(password, passwordRepeat);

        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
            return res.status(422).json({ message: 'User already exists, please login instead.' });
        }

        const verificationCode = generateCode();

        const createdUser = new User({
            username,
            email,
            password,
            verified: false,
            verificationCode: verificationCode
        });

        await createdUser.save();

        sendVerificationEmail(email, verificationCode);

        res.status(200).json({ message: 'Verification code sent successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to sign up, please try again later.' });
    }
};



exports.signup = signup;
