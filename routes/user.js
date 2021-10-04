const router = require("express").Router();
const verify = require('../middleware/auth')


router.get("/", verify, (req, res) => {
  res.send(req.user);
});

module.exports = router;
