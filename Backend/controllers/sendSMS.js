const { Vonage } = require('@vonage/server-sdk');
const Event = require('../models/event');

const vonage = new Vonage({
  apiKey: "10917f80",
  apiSecret: "hkA75cMagXqsvCZN"
});
 // לסדר את זה עם הקידומות
const formatPhoneNumber = (phone) => {
    // הסרת רווחים, מקפים ותווים אחרים שאינם מספרים
    let formatted = phone.replace(/[\s-]/g, '');
    
    // אם המספר מתחיל באפס, הסר אותו והוסף את הקידומת 972
    if (formatted.startsWith('0')) {
      formatted = '972' + formatted.slice(1);
    } else if (!formatted.startsWith('+972')) {
      // אם המספר אינו כולל את קידומת 972, הוסף אותה
      formatted = '972' + formatted;
    }

    return formatted;
};

const sendSMS = async (to, text) => {
    try {
      const formattedPhone = formatPhoneNumber(to);
      console.log(`Sending message to ${formattedPhone}`);

      const response = await vonage.sms.send({
        to: formattedPhone,
        from: "Vonage APIs",
        text: Buffer.from(text, 'utf-8').toString(), // לוודא שהטקסט מקודד כראוי
        'type': 'unicode' // להגדיר את סוג ההודעה כ-unicode עבור תמיכה בתווים בעברית
      });

      console.log(`Response: ${JSON.stringify(response)}`);
      if (response.messages[0].status === '0') {
        console.log(`Message sent to ${formattedPhone} successfully`);
      } else {
        console.log(`Message failed to ${formattedPhone} with error: ${response.messages[0]['error-text']}`);
      }
    } catch (error) {
      console.log(`There was an error sending the message to ${to}.`);
      console.error(error);
    }
};

exports.sendSMS = sendSMS;

