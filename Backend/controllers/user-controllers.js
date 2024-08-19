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

        // בדיקה אם המייל כבר קיים בבסיס הנתונים
        const existingUserByEmail = await User.findOne({ email: email });

        if (existingUserByEmail) {
            return res.status(422).json({ message: 'המייל כבר רשום, אנא השתמש במייל אחר.' });
        }

        // בדיקה אם שם המשתמש כבר קיים בבסיס הנתונים
        const existingUserByUsername = await User.findOne({ username: username });

        if (existingUserByUsername) {
            return res.status(422).json({ message: 'שם המשתמש כבר קיים, אנא בחר שם משתמש אחר.' });
        }

        const verificationCode = generateCode();

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 12);
        } catch (error) {
            return res.status(500).json({ message: error.message || 'לא ניתן ליצור משתמש, נסה שוב.' });
        }

        const createdUser = new User({
            username,
            email,
            password: hashedPassword,
            verified: false,
            verificationCode: verificationCode
        });

        await createdUser.save();

        sendVerificationEmail(email, verificationCode);

        res.status(200).json({ message: 'קוד אימות נשלח בהצלחה.' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'ההרשמה נכשלה, נסה שוב מאוחר יותר.' });
    }
};


const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        validateUsername(username);
        validatePassword(password);

        const existingUser = await User.findOne({ username: username });

        if (!existingUser) {
            return res.status(401).json({ message: 'פרטי ההתחברות אינם תקינים, נסה שוב.' });
        }

        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(password, existingUser.password);
        } catch (error) {
            return res.status(500).json({ message: error.message || 'לא הצלחנו להתחבר, נא לבדוק את פרטי ההתחברות ולנסות שוב.' });
        }

        if (!isValidPassword) {
            return res.status(401).json({ message: 'פרטי ההתחברות אינם תקינים, נסה שוב.' });
        }

        if (!existingUser.isVerified) {
            return res.json({ navigateTo: 'ConfirmEmail', email: existingUser.email });
        }

        const token = jwt.sign(
            { userId: existingUser._id, username: existingUser.username, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ message: 'מחובר בהצלחה!', user: existingUser.toObject({ getters: true }), token: token });
    } catch (error) {
        res.status(500).json({ message: error.message || 'ההתחברות נכשלה, נא לנסות שוב מאוחר יותר.' });
    }
};

const confirmEmail = async (req, res, next) => {
    const { email, verificationCode } = req.body;

    try {
        validateEmail(email);

        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: 'המשתמש לא נמצא.' });
        }

        if (existingUser.isVerified) {
            return res.status(400).json({ message: 'האימייל כבר אומת.' });
        }

        if (existingUser.verificationCode !== verificationCode) {
            return res.status(401).json({ message: 'קוד האימות אינו תקין.' });
        }

        existingUser.isVerified = true;

        const token = jwt.sign(
            { userId: existingUser._id, username: existingUser.username, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        await existingUser.save();

        res.json({ message: 'האימייל אומת בהצלחה', token: token });
    } catch (error) {
        res.status(500).json({ message: error.message || 'לא הצלחנו לאמת את האימייל, נא לנסות שוב מאוחר יותר.' });
    }
};

const resendVerificationCode = async (req, res, next) => {
    const { email } = req.body;

    try {
        validateEmail(email);

        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: 'המשתמש לא נמצא.' });
        }

        if (existingUser.isVerified) {
            return res.status(400).json({ message: 'האימייל כבר אומת.' });
        }

        const newVerificationCode = generateCode();
        
        existingUser.verificationCode = newVerificationCode;

        await existingUser.save();

        sendVerificationEmail(email, newVerificationCode);

        res.status(200).json({ message: 'קוד האימות נשלח מחדש בהצלחה.' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'לא הצלחנו לשלוח מחדש את קוד האימות, נא לנסות שוב מאוחר יותר.' });
    }
};

const verifyUsername = async (req, res, next) => {
    const { username } = req.body;

    try {
        validateUsername(username);

        const existingUser = await User.findOne({ username: username });

        if (!existingUser) {
            return res.status(404).json({ message: 'המשתמש לא נמצא.' });
        }

        const resetCode = generateCode();
        existingUser.resetCode = resetCode;
        
        await existingUser.save();

        const email = existingUser.email;
        sendPasswordResetEmail(email, resetCode);
        res.status(200).json({ message: 'המשתמש קיים, המשך לאיפוס סיסמה.' });

    } catch (error) {
        res.status(500).json({ message: error.message || 'לא הצלחנו לעדכן את קוד האיפוס, נא לנסות שוב מאוחר יותר.' });
    }
};

const resetPassword = async (req, res, next) => {
    const { username, resetCode, newPassword } = req.body;

    try {
        validateUsername(username);
        validatePassword(newPassword);

        const existingUser = await User.findOne({ username: username });

        if (!existingUser) {
            return res.status(404).json({ message: 'המשתמש לא נמצא.' });
        }

        if (existingUser.resetCode !== resetCode) {
            return res.status(401).json({ message: 'קוד האיפוס אינו תקין.' });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(newPassword, 12);
        } catch (error) {
            return res.status(500).json({ message: error.message || 'לא הצלחנו לחתום את הסיסמה, נא לנסות שוב.' });
        }

        existingUser.password = hashedPassword;
        existingUser.resetCode = undefined;

        await existingUser.save();

        res.json({ message: 'הסיסמה שונתה בהצלחה.' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'לא הצלחנו לשנות את הסיסמה, נא לנסות שוב מאוחר יותר.' });
    }
};

exports.signup = signup;
exports.login = login;
exports.confirmEmail = confirmEmail;
exports.verifyUsername = verifyUsername;
exports.resetPassword = resetPassword;
exports.resendVerificationCode = resendVerificationCode;
