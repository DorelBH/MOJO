const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
});

const sendVerificationEmail = (email, verificationCode) => {
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'אימות חשבון',
        text: `קוד אימות לחשבון שלך: ${verificationCode}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('הודעת אימות נשלחה בהצלחה: ' + info.response);
        }
    });
};

const sendPasswordResetEmail = (email, resetCode) => {
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'איפוס סיסמה',
        text: `קוד איפוס סיסמה: ${resetCode}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('הודעת איפוס סיסמה נשלחה בהצלחה: ' + info.response);
        }
    });
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail
};
