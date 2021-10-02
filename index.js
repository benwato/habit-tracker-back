const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
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



//route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts',postRoute)
app.use('/api/habits', habitRoute)

app.listen(3000, () => console.log('server up and running'))