const jwt = require("jsonwebtoken");

//middleware function to check token
module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  // const token = req.cookies.jwt
  if (!token) return res.status(401).send("access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}
