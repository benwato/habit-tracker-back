const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require('./verifyToken');
const { registerValidation, loginValidation } = require("../validation");

router.get('/show',verify, (req,res) => {
    res.send(req.user.name)
})

router.post('/add', verify, async (req,res) => {
    // add new habit with data as follows
    // for now i have left this test habit
    const newHabit = {
        name: 'it-works',
        habitCompletion: {
            currentVal: 0,
            targetVal: 10,
            daysComplete : []
        },
        frequency: {
            daily: true,
            weekly: false,
            monthly: false
        }
    } 
    await User.findOneAndUpdate({'_id': req.user._id}, {$push: {habits: newHabit}})
    res.send(await User.find({_id: req.user._id}))
})

router.delete('/remove', verify, async (req,res) => {
    //remove new habit by name
    // for now i am just removing this test habit
    const habitToRemove = 'test-habit-5'
    await User.findOneAndUpdate({'_id': req.user._id}, {$pull: {habits:{name: habitToRemove}}})
    res.send(await User.find({_id: req.user._id}))
})

module.exports = router;
