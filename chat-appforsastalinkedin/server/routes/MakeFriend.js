const express = require("express");
const router = express.Router();
const Profile = require("../Models/Profile");
const fetchuser = require("../Middleware/fetchuser");
const Friend = require("../Models/Friend");

router.post("/makefriend/:id", fetchuser, async (req, res) => {
  let friendData = await Friend.findOne({ USERID: req.id });

  console.log(req.id);

  const newData = {};
  newData.USERID = req.id;

  newData.Friends = [];

  if (friendData) {
    const id = friendData._id;
    let friendData1 = await Friend.findByIdAndDelete(id);
    newData.Friends = friendData.Friends;
  }

  newData.Friends.push(req.params.id);

  friendData = await Friend.create(newData);
  res.json(friendData);
});

module.exports = router;
