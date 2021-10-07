const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const cors = require('cors')
//import routes
const authRoute = require('./routes/auth');
const habitRoute = require('./routes/habits')
const userRoute = require('./routes/user')
//.env config
dotenv.config();
//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: true
}));

//route middlewares
app.use('/api/user', authRoute);
app.use('/api/habits', habitRoute)
app.use('/api', userRoute)

module.exports = app;