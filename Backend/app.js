const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const usersRoutes = require ('./routes/user-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/users',usersRoutes);// => api/users/....


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    app.listen(5000);
    console.log('Server is running on port 5000');
}).catch(err=>{
    console.log(err);
});


