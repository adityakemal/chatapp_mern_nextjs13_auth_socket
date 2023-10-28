const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  // console.log(token)
  if (!token) return res.status(401).send("UNAUTHORIZED!");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("invalid Token");
  }
};
