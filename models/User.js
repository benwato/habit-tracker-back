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
    habits: [habitSchema],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }




}, {
    timestamps: false
});

userSchema.methods.checkSomething = async function checkSomething() {
    updateHabitOnTime(this)
    //do this for every habit in the habits array
    async function updateHabitOnTime(obj) {
        for (const habit of obj.habits) {
            const currentDate = Date.now()
            const updatedDate = await getDate(habit)
            async function getDate(habit) {
                return await habit.updatedAt
            }
            //compare current date to createdAt date
            const dateDifferenceMinutes = dateDifferenceMs / (1000 * 60)
            //if it has been a day, compute currentVal/targetVal
            //first check if it has been more than 1 minute, for repeated api call
            if (dateDifferenceMinutes >= 1) {
                const completedFraction = habit.completion.currentVal / habit.completion.targetVal
                // push this value to array dailyValues
                habit.completion.dailyValues.push(completedFraction)
                if (completedFraction >= 1) {
                    habit.completion.daysComplete.push(1)
                } else {
                    habit.completion.daysComplete.push(0)
                }
                habit.completion.currentVal = 0;
                habit.updatedAt = Date.now()
                await obj.save()

            }
        }

    }

}

module.exports = mongoose.model('User', userSchema)