const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventType: { type: String, required: true },
    groomName: { type: String },
    brideName: { type: String },
    name: { type: String },
    eventDate: { type: Date },
    amountInvited: { type: Number, required: true },
    selectedRegions: [{ type: String, required: true }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    photo: { type: String },
    costs: [{
        label: { type: String, required: false },
        cost: { type: Number, required: false }
    }],
    checkLists: [{
        timeframe: { type: String, required: false },
        tasks: [{
            label: { type: String, required: false },
            completed: { type: Boolean, required: false }
        }]
    }],
    guests: [{
        name: { type: String, required: true },
        phone: { type: String, required: true },
        invited: { type: Boolean, default: false }
    }],
    paymentDeadlines: [{
        supplierName: { type: String, required: false },
        date: { type: Date, required: false },
        completed: { type: Boolean, default: false }
    }]
});

module.exports = mongoose.model('Event', eventSchema);
