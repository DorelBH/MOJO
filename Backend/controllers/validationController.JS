// validationController.js

// Function to validate username
const validateUsername = (username) => {
    if (!username) {
        throw new Error('Username is required.');
    }
    if (username.length < 3) {
        throw new Error('Username must be at least 3 characters long.');
    }
};

// Function to validate email address
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(String(email).toLowerCase())) {
        throw new Error('Invalid email format.');
    }
};

// Function to validate password
const validatePassword = (password) => {
    if (!password) {
        throw new Error('Password is required.');
    }
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
    }
};

// Function to validate password match
const validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
    }
};

const validateEventType = (eventType) => {
    if (!eventType) {
        throw new Error('Event type is required.');
    }
    // אפשר להוסיף כאן בדיקות נוספות, לדוגמה אם סוג האירוע נמצא ברשימה מוגדרת של סוגי אירועים תקפים
};

// Function to validate amount invited
const validateAmountInvited = (amountInvited) => {
    if (!amountInvited) {
        throw new Error('Amount of invited people is required.');
    }
    if (isNaN(amountInvited) || amountInvited < 1) {
        throw new Error('Amount of invited people must be a positive number.');
    }
};

exports.validateEventType = validateEventType;
exports.validateAmountInvited = validateAmountInvited;
exports.validateUsername = validateUsername;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validatePasswordMatch = validatePasswordMatch;
