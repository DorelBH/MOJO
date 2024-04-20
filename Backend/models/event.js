const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventType: { type: String, required: true },
    groomName: { type: String},
    brideName: { type: String},  
    name: { type: String},
    eventDate: { type: Date },
    amountInvited: { type: Number, required: true },
    selectedRegions: [{ type: String, required: true }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // הוספת מזהה המשתמש
    photo: { type: String },
    costs: [{
        label: { type: String, required: false },
        cost: { type: Number, required: false }
    }]
});

module.exports = mongoose.model('Event', eventSchema);
