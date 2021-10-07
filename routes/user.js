const router = require("express").Router();
const verify = require('../middleware/auth')
const User = require("../models/User");


router.get("/", verify, async (req, res) => {
  const result = await User.find({"_id":req.user._id})
  res.status(200).json(result)
});

module.exports = router;
