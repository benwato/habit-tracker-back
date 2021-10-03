const mongoose = require('mongoose');
const habitSchema = require('./Habit').schema;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    habits: [habitSchema]
   



}, {timestamps: true});

module.exports = mongoose.model('User',userSchema)

