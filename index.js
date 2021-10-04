const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const cors = require('cors')
//import routes
const authRoute = require('./routes/auth');
const habitRoute = require('./routes/habits')

//.env config
dotenv.config();


//connect to db
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true
}, () => {
    console.log('connected to db')
})

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

app.listen(3000, () => console.log('server up and running'))

module.exports = app