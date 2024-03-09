const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String ,require: true },
    email: {type: String , require: true, unique: true}, // unique - create index for email
    password:{ type: String, require: true, minlength: 8 },
    isVerified: {type:Boolean,default:false},
    verificationCode: { type: String },
    resetCode: { type: String } // Add resetCode field for password reset
});


module.exports = mongoose.model('User',userSchema);
