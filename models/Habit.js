const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    
    frequency: {
        daily: {
            type: Boolean,
            default: true
        },
        weekly: {
            type: Boolean,
            default: false
        },
        monthly: {
            type: Boolean,
            default: false
        }
    },
    completion: {
        currentVal: {
            type: Number,
            default: 0,
            min: 1
        },
        targetVal: {
            type: Number,
            default: 1,
            min: 1
        },
    }
   



}, {timestamps: true});

module.exports = mongoose.model('Habit',habitSchema)