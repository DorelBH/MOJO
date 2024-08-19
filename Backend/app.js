const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const path = require('path');  // ייבוא מודול path
const usersRoutes = require('./routes/user-routes');
const eventsRoutes = require('./routes/event-routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', usersRoutes);
app.use('/api/events', eventsRoutes);

app.use(express.static(path.join(__dirname, 'public')));

// הוספת נתיב להגשת דף ה-RSVP
app.get('/rsvp', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'rsvp.html'));
});

const PORT = process.env.PORT || 3500;

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });


  