const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique - create index for email
    password: { type: String, required: true, minlength: 8 },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    resetCode: { type: String }, // Add resetCode field for password reset
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // הוספת מערך של מזהים של אירועים
});

module.exports = mongoose.model('User', userSchema);
