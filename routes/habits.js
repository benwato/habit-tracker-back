const router = require("express").Router();
const User = require("../models/User");
const Habit = require('../models/Habit')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require('../middleware/auth');
const {
    registerValidation,
    loginValidation,
    habitValidation
} = require("../validation");

//route for showing all habits
router.get('/show', verify, async (req, res) => {
   
    
    const user = await User.findOne({"_id": req.user._id});
    await user.checkSomething()
    //now we have access to User.habits
    
    res.status(201).json(user.habits)
})

router.get('/show-noupdate', verify, async (req, res) => {
    
    const user = await User.findOne({"_id": req.user._id});
    //now we have access to User.habits
    
    res.status(201).json(user.habits)
})



router.get('/show/:id', verify, async (req, res) => {
    const user = await User.findOne({"_id": req.user._id});
    const singleHabit = user.habits.filter(habit => habit._id==req.params.id)
    res.status(201).json({singleHabit})
})

//route for adding new habit
router.post('/add', verify, async (req, res) => {
    // add new habit with data as follows
    // for now i have left this test habit
    // for testing, change to req.body."..."
    // or just input strings
    const {error} = habitValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const data = req.body;
    try {
        const newHabit = new Habit({
        
            name: data.name,
            completion: {
                targetVal: data.completion.targetVal,
                currentVal: data.completion.currentVal,
                daysComplete: data.completion.daysComplete,
                dailyValues: data.completion.dailyValues
                
            },
            frequency: {
                daily: data.frequency.daily,
                weekly: data.frequency.weekly,
                monthly: data.frequency.monthly
            },
            updatedAt: data.updatedAt,
            notes: data.notes
        })
        const result = await User.findOneAndUpdate({
            '_id': req.user._id
        }, {
            $push: {
                habits: newHabit
            }
        }, {new:true})
        res.status(201).send(result)
    }
    catch(error) {
        res.status(401).send(`Server error: ${error}`)
    }
    
})

//route for updating habit by id
router.patch('/update/:id', verify, async (req, res) => {
    //using placeholder constant for value
    const {error} = habitValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const data = req.body;
    const updatedHabit = {
        name: data.name,
            completion: {
                targetVal: data.completion.targetVal,
                currentVal: data.completion.currentVal,
                //REMOVE THIS LATER - FOR DEBUGGING ONLY
                daysComplete: data.completion.daysComplete, //array 1s and 0s
                dailyValues: data.completion.daysComplete
            },
            frequency: {
                daily: data.frequency.daily,
                weekly: data.frequency.weekly,
                monthly: data.frequency.monthly
            },
            updatedAt: Date.now(),
            notes: data.notes
            
    }
    const result = await User.findByIdAndUpdate(
        {"_id": req.user._id},
        { $set: {[`habits.${req.params.id}`]: updatedHabit}},
        {new: true}
    
    )
    res.status(204).send(result)
})

router.patch('/updatecurrent/:id',verify, async(req,res)=> {
    const data =req.body;
    console.log(data)
    const updatedCurrent = data.completion.currentVal;

    const result = await User.findByIdAndUpdate(
        {"_id": req.user._id},
        { $set: {[`habits.${req.params.id}.completion.currentVal`]: updatedCurrent}},
        {new: true}
    )

})


router.delete('/delete/:name', verify, async (req, res) => {
    //remove new habit by name
    // for now i am just removing this test habit

    const habitToRemove = req.params.name.split('_').join(' ')
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