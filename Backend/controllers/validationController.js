// validationController.js

// פונקציה לאימות שם משתמש
const validateUsername = (username) => {
    if (!username) {
        throw new Error('שם משתמש חובה.');
    }
    if (username.length < 3) {
        throw new Error('שם משתמש חייב להיות באורך של לפחות 3 תווים.');
    }
};

// פונקציה לאימות כתובת אימייל
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(String(email).toLowerCase())) {
        throw new Error('פורמט האימייל אינו תקין.');
    }
};

// פונקציה לאימות סיסמה
const validatePassword = (password) => {
    if (!password) {
        throw new Error('סיסמה חובה.');
    }
    if (password.length < 8) {
        throw new Error('הסיסמה חייבת להיות באורך של לפחות 8 תווים.');
    }
};

// פונקציה לאימות התאמה בין סיסמאות
const validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw new Error('הסיסמאות אינן תואמות.');
    }
};

const validateEventType = (eventType) => {
    if (!eventType) {
        throw new Error('סוג האירוע חובה.');
    }
    // אפשר להוסיף כאן בדיקות נוספות, לדוגמה אם סוג האירוע נמצא ברשימה מוגדרת של סוגי אירועים תקפים
};

// פונקציה לאימות כמות מוזמנים
const validateAmountInvited = (amountInvited) => {
    if (!amountInvited) {
        throw new Error('כמות המוזמנים חובה.');
    }
    if (isNaN(amountInvited) || amountInvited < 1) {
        throw new Error('כמות המוזמנים חייבת להיות מספר חיובי.');
    }
};

// פונקציה לאימות שדות אירוע בהתאם לסוג האירוע
const validateEventFields = (eventType, groomName, brideName, name) => {
    if (eventType === "חתונה" || eventType === "חינה") {
        if (!groomName) {
            throw new Error('שם החתן חובה.');
        }
        if (!brideName) {
            throw new Error('שם הכלה חובה.');
        }
    } else {
        if (!name) {
            throw new Error('שם חובה.');
        }
    }
};

exports.validateEventFields = validateEventFields;
exports.validateEventType = validateEventType;
exports.validateAmountInvited = validateAmountInvited;
exports.validateUsername = validateUsername;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validatePasswordMatch = validatePasswordMatch;
