const router = require("express").Router();
const User = require("../models/User");

//LOGIN
router.get("/", async (req, res) => {
  //validate if email doesn't exist
  var nameRegex = new RegExp(req.query.email);
  const user = await User.find(
    { email: { $regex: nameRegex, $options: "i" } },
    "email username createdAt updatedAt"
  );

  res.status(200).json({
    message: "SUCCESS",
    data: user,
  });
});

// router.get("/", async (req, res) => {
//   //validate if email doesn't exist
//   var nameRegex = new RegExp(req.query.email);
//   const user = await User.find(
//     { email: { $regex: nameRegex, $options: "i" } }
//     // "email username conversations createdAt updatedAt"
//   )
//   // .lean();

//   res.status(200).json({
//     message: "SUCCESS",
//     data: user,
//   });
// });

//get by id
router.get("/:userId", async (req, res) => {
  //validate if email doesn't exist
  let userId = await req.params.userId;
  const user = await User.findOne(
    { _id: userId },
    "email username conversations createdAt updatedAt"
  );

  res.status(200).json({
    message: "SUCCESS",
    data: user,
  });
});

router.delete("/", async (req, res) => {
  //validate if email doesn't exist
  const user = await User.deleteMany();

  res.status(200).json({
    message: "SUCCESS",
    data: user,
  });
});

module.exports = router;
