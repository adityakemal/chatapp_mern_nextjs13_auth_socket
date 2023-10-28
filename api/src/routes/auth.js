const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  registerValidation,
  loginValidation,
} = require("../validation/auth.validation");

// REGISTER
router.post("/register", async (req, res) => {
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //validate if email exist
  const userInDb = await User.findOne({ email: req.body.email });
  if (userInDb) return res.status(400).json("Email already registered!");

  //create new user
  const { username, email } = req.body;
  const user = new User({
    username,
    email,
    password: hashedPass,
  });
  try {
    const data = await user.save();

    const { email, username, date } = data;

    console.log("datasaved", data);
    await res
      .status(201)
      .json({ message: `SUCCESS`, data: { email, username, date } });
  } catch (err) {
    res.status(400);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  console.log(req.body);
  //LEST VALIDATE
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //validate if email doesn't exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Email not found!" });

  //if password correct
  const isCorrectPass = await bcrypt.compare(req.body.password, user.password);
  if (!isCorrectPass)
    return res.status(400).json({ message: "the password is incorrect!" });

  const { _id, username, email } = user;
  //CREATE TOKEN
  const token = jwt.sign(
    { _id, username, email },
    process.env.SECRET_KEY_TOKEN
  );
  res.status(200).json({
    message: "SUCCESS",
    data: {
      _id,
      username,
      email,
      token: token,
    },
  });
});

module.exports = router;
