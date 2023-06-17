const express = require("express");
const router = express.Router();
const User = require("../Models/Usermodel");
const fetchuser = require("../Middleware/fetchuser");

var jwt = require("jsonwebtoken");
var JWT_SECRET = "Utpalis@goodboy";

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

// singup is working fine

router.post("/signup", async (req, res) => {
  try {
    // no need for express-async -handler

    const { username, password, email, confirmpassword, pic } = req.body;

    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).json({ error: "Please Enter all the fields " });
    }

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ error: "User already exist " });
    } else if (password !== confirmpassword) {
      return res.status(400).json({ error: "Password is not matching " });
    }

    user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      pic: req.body.pic,
    });

    //  console.log(user._id);
    console.log(user);

    res.json({ authtoken: generateToken(user._id) });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

// login endpoint

router.post("/login", async (req, res) => {
  try {
    // no need for express-async -handler

    const { email, password } = req.body;
    let user = await User.findOne({ email: req.body.email });

    if (user && password === user.password) {
      console.log("HII");
      return res.status(200).json({ authtoken: generateToken(user._id) });
    } else {
      return res.status(400).send("Enter correct credentials");
    }
  } catch (error) {
    res.status(400).json({ err: "NO" });
  }
});

// auth usrer

router.post(
  "/fetchuser",
  fetchuser,

  async (req, res) => {
    try {
      const userId = req.id; // req.user.id mai aa jayega id
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      //try ends

      res.status(500).json({ error: " Internal Server error occured" });
    } //catch
  }
);

module.exports = router;
