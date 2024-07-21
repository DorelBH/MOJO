const { Vonage } = require('@vonage/server-sdk');
const Event = require('../models/event');

const vonage = new Vonage({
  apiKey: "10917f80",
  apiSecret: "hkA75cMagXqsvCZN"
});

const formatPhoneNumber = (phone) => {
    // הסרת רווחים, מקפים ותווים אחרים שאינם מספרים
    let formatted = phone.replace(/[\s-]/g, '');
    
    // אם המספר מתחיל באפס, הסר אותו והוסף את הקידומת 972
    if (formatted.startsWith('0')) {
      formatted = '972' + formatted.slice(1);
    } else if (!formatted.startsWith('972')) {
      // אם המספר אינו כולל את קידומת 972, הוסף אותה
      formatted = '972' + formatted;
    }
  
    return formatted;
  };
  
  const sendSMS = async (to, text) => {
    try {
      const formattedPhone = formatPhoneNumber(to);
      console.log(`Sending message to ${formattedPhone}`);
      const response = await vonage.sms.send({ to: formattedPhone, from: "Vonage APIs", text });
      console.log(`Response: ${JSON.stringify(response)}`);
      if (response.messages[0].status === '0') {
        console.log(`Message sent to ${formattedPhone} successfully`);
      } else {
        console.log(`Message failed to ${formattedPhone} with error: ${response.messages[0].error-text}`);
      }
    } catch (error) {
      console.log(`There was an error sending the message to ${to}.`);
      console.error(error);
    }
  };
  
  const notifyGuests = async (req, res) => {
    const eventId = req.params.eventId;
  
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      const guests = event.guests;
  
      for (const guest of guests) {
        if (guest.phone) {
          const phone = guest.phone;
          const text = `Hello ${guest.name}, you are invited to the wedding of ${event.groomName} and ${event.brideName} on ${event.eventDate}. Please reply with the number of people attending the event. If you cannot attend, reply with 0.`;
          await sendSMS(phone, text);
        }
      }
  
      res.status(200).json({ message: 'Guests notified successfully' });
    } catch (error) {
      console.error('Error notifying guests:', error);
      res.status(500).json({ message: 'Error notifying guests', error: error.message });
    }
  };
  
  exports.sendSMS = sendSMS;
  exports.notifyGuests = notifyGuests;