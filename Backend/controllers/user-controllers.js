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

const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        validateUsername(username);
        validatePassword(password);

        const existingUser = await User.findOne({ username: username });

        if (!existingUser || existingUser.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials, could not log you in.' });
        }

        if (!existingUser.isVerified) {
            console.log( 'Account is not verified, please verify your email.');
            return res.json({ navigateTo: 'ConfirmEmail', email: existingUser.email });

        }
        
        res.json({ message: 'Logged in!', user: existingUser.toObject({ getters: true }) });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to log in, please try again later.' });
    }
};

const confirmEmail = async (req, res, next) => {
    const { email, verificationCode } = req.body;

    try {
        validateEmail(email);

        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (existingUser.isVerified) {
            return res.status(400).json({ message: 'Email is already verified.' });
        }

        if (existingUser.verificationCode !== verificationCode) {
            return res.status(401).json({ message: 'Invalid verification code.' });
        }

        existingUser.isVerified = true;

        await existingUser.save();

        res.json({ message: 'Email confirmed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to confirm email, please try again later.' });
    }
};

const resendVerificationCode = async (req, res, next) => {
    const { email } = req.body;

    try {
        validateEmail(email);

        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (existingUser.isVerified) {
            return res.status(400).json({ message: 'Email is already verified.' });
        }

        const newVerificationCode = generateCode();
        
        existingUser.verificationCode = newVerificationCode;

        await existingUser.save();

        sendVerificationEmail(email, newVerificationCode);

        res.status(200).json({ message: 'Verification code resent successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to resend verification code, please try again later.' });
    }
};

const verifyUsername = async (req, res, next) => {
    const { username } = req.body;

    try {
        validateUsername(username);

        const existingUser = await User.findOne({ username: username });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const resetCode = generateCode();
        existingUser.resetCode = resetCode;
        

        await existingUser.save();

        const email = existingUser.email;
        sendPasswordResetEmail(email,resetCode);
        res.status(200).json({ message: 'Username exists, continue to reset password.' });

    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to update reset code, please try again later.' });
    }
};

const resetPassword = async (req, res, next) => {
    const { username, resetCode, newPassword } = req.body;

    try {
        validateUsername(username);
        validatePassword(newPassword);

        const existingUser = await User.findOne({ username: username });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (existingUser.resetCode !== resetCode) {
            return res.status(401).json({ message: 'Invalid reset code.' });
        }

        existingUser.password = newPassword;
        existingUser.resetCode = undefined;

        await existingUser.save();

        res.json({ message: 'Password reset successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to reset password, please try again later.' });
    }
};


exports.signup = signup;
exports.login = login;
exports.confirmEmail = confirmEmail;
exports.verifyUsername = verifyUsername;
exports.resetPassword = resetPassword;
exports.resendVerificationCode=resendVerificationCode;