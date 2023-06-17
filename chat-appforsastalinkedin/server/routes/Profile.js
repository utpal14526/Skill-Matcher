const express = require("express");
const router = express.Router();
const Profile = require("../Models/Profile");
const fetchuser = require("../Middleware/fetchuser");

router.post("/profileupdate", fetchuser, async (req, res) => {
  let profile = await Profile.findOne({ USERID: req.id });

  if (profile) {
    let idofprofile = profile._id;

    profile = await Profile.findByIdAndDelete(idofprofile);
  }

  // create new profile of that user via req.body;

  profile = await Profile.create(req.body); // user id bhi frontend se aayegi

  res.status(200).json({ msg: "Updated Successfully" });
});

module.exports = router;
