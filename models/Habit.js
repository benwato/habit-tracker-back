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
        units: {
            type: String
        },
        currentVal: {
            type: Number,
            default: 0,
            min: 0
        },
        targetVal: {
            type: Number,
            default: 1,
            min: 1
        },
        daysComplete: [],
        dailyValues: [],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    },
    notes: {
        type: String
    }





}, {
    timestamps: false
});






module.exports = mongoose.model('Habit', habitSchema)