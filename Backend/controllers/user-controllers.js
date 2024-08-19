const User = require('../models/user');
const { sendVerificationEmail, sendPasswordResetEmail } = require('./email-service');
const { validateUsername, validateEmail, validatePassword } = require('./validationController.js');

const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        validateUsername(username);
        validateEmail(email);
        validatePassword(password);

        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
            return res.status(422).json({ message: 'User already exists, please login instead.' });
        }

        const verificationCode = generateCode();

        let hashedPassword;
        try{
        hashedPassword= await bcrypt.hash(password,12);
        } catch(error) {
            res.status(500).json({ message: error.message || 'Could not create user, please try again.'});
        }
        
        const createdUser = new User({
            username,
            email,
            password:hashedPassword,
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

        if (!existingUser ) {
            return res.status(401).json({ message: 'Invalid credentials, could not log you in.' });
        }

        let isValidPassword = false;
        try {
        isValidPassword = await bcrypt.compare(password,existingUser.password);
        }catch(error){
            res.status(500).json({ message: error.message || 'Could not log you in, please check your credentials and try again.'});
        }

        if (!isValidPassword ) {
            return res.status(401).json({ message: 'Invalid credentials, could not log you in.' });
        }

        if (!existingUser.isVerified) {
            console.log( 'Account is not verified, please verify your email.');
            return res.json({ navigateTo: 'ConfirmEmail', email: existingUser.email });

        }
        const token = jwt.sign(
            { userId: existingUser._id, username: existingUser.username, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }  //3 hours token (fix after )
        );

        res.json({ message: 'Logged in!', user: existingUser.toObject({ getters: true }), token: token });
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

        const token = jwt.sign(
            { userId: existingUser._id,username: existingUser.username, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        await existingUser.save();

        res.json({ message: 'Email confirmed successfully', token: token });
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

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(newPassword, 12);
        } catch (error) {
            res.status(500).json({ message: error.message || 'Could not hash password, please try again.' });
            return;
        }

        existingUser.password = hashedPassword;
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