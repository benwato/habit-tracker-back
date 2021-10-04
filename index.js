const app = require('./server')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
//.env config
dotenv.config();

app.listen(3000, () => console.log('server up and running'))

//connect to db
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true
}, () => {
    console.log('connected to db')
})
