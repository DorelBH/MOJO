const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const usersRoutes = require('./routes/user-routes');
const eventsRoutes = require('./routes/event-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', usersRoutes); // => api/users/....
app.use('/api/events', eventsRoutes); // => api/events/....

const PORT = process.env.PORT || 3500; // השתמש במשתנה הסביבה PORT או ב-3500 כברירת מחדל

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
