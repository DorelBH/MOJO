const { Vonage } = require('@vonage/server-sdk');
const Event = require('../models/event');

// התחברות ל-Vonage API
const vonage = new Vonage({
  apiKey: "10917f80",
  apiSecret: "hkA75cMagXqsvCZN"
});

// פונקציה זו מעבדת הודעות SMS נכנסות ומעדכנת את תגובת האורחים
const processIncomingSMS = async (msisdn, text) => {
    try {
        // המרת מספר הטלפון לפורמט הרצוי (למשל 972526933301)
        let formattedPhone = msisdn.replace(/[\s+-]/g, ''); 
        
        if (formattedPhone.startsWith('0')) {
            formattedPhone = '972' + formattedPhone.slice(1); 
        } else if (!formattedPhone.startsWith('972')) {
            formattedPhone = '972' + formattedPhone;
        }
        
        console.log(`Received SMS from: ${msisdn}`);
        console.log(`Formatted phone: ${formattedPhone}`);
        console.log(`Response text: ${text}`);

        // מציאת האירוע על פי מספר הטלפון של האורח
        const event = await Event.findOne({ 'guests.phone': formattedPhone });
        if (!event) {
            console.log("Event not found");
            return { status: 404, message: "Event not found" };
        }

        // מציאת האורח על פי מספר הטלפון
        const guest = event.guests.find(guest => guest.phone === formattedPhone);
        if (!guest) {
            console.log("Guest not found");
            return { status: 404, message: "Guest not found in the list" };
        }

        // המרת הטקסט למספר שלם
        const response = parseInt(text, 10); 
        if (isNaN(response) || response < 0) {
            console.log("Invalid response received");
            return { status: 400, message: "Invalid response. It must be a non-negative integer." };
        }

        // עדכון תגובת האורח
        guest.response = response;

        // שמירת השינויים בבסיס הנתונים
        await event.save();

        console.log("Guest response updated successfully");
        return { status: 200, message: "Guest response updated successfully", event };
    } catch (error) {
        console.error("Error processing SMS:", error.message);
        return { status: 500, message: error.message || "Failed to process SMS" };
    }
};

module.exports = {
    processIncomingSMS
};
