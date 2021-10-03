const router = require("express").Router();
const User = require("../models/User");
const Habit = require('../models/Habit')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require('./verifyToken');
const {
    registerValidation,
    loginValidation
} = require("../validation");

//route for showing all habits
router.get('/show', verify, (req, res) => {
    res.send(req.user.name)
})

//route for adding new habit
router.post('/add', verify, async (req, res) => {
    // add new habit with data as follows
    // for now i have left this test habit
    
    console.log(req)
    const newHabit = new Habit({
        name: 'test-habit-3',
        // completion: {
        //     targetVal: 100,
        //     currentVal: 60,
        // },
        // frequency: {
        //     daily: true,
        //     weekly: false,
        //     monthly: false
        // }
    })
    await User.findOneAndUpdate({
        '_id': req.user._id
    }, {
        $push: {
            habits: newHabit
        }
    })
    res.send(await User.find({
        _id: req.user._id
    }))
})

//route for updating target value of habit
router.patch('/update/target/:id', verify, async (req, res) => {
    //using placeholder constant for value
    const targetVal = 150;
    const result = await User.findByIdAndUpdate(
        {"_id": req.user._id},
        { $set: {[`habits.${req.params.id}.completion.targetVal`]: targetVal}},
        {new: true}
    
    )
    res.send(result)
})

//route for updating current value of habit
router.patch('/update/current/:id', verify, async (req, res) => {
    //using placeholder constant for value
    const currentVal = 150;
    const result = await User.findByIdAndUpdate(
        {"_id": req.user._id},
        { $set: {[`habits.${req.params.id}.completion.currentVal`]: currentVal}},
        {new: true}
    
    )
    res.send(result)
})

router.delete('/remove/:name', verify, async (req, res) => {
    //remove new habit by name
    // for now i am just removing this test habit
    const habitToRemove = req.params.name
    await User.findOneAndUpdate({
        '_id': req.user._id
    }, {
        $pull: {
            habits: {
                name: habitToRemove
            }
        }
    })
    res.send(await User.find({
        _id: req.user._id
    }))
})

module.exports = router;