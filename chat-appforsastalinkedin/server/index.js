const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json()); //middleware

const DB = "mongodb://127.0.0.1:27017/sastachatapp";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));

// mongoose.connect (DB).then(()=>{

//})

// / means this is singup

app.use("/api", require("./routes/registerUser"));
app.use("/api", require("./routes/Profile"));
app.use("/api", require("./routes/SelectFriend"));
app.use("/api", require("./routes/MakeFriend"));

app.listen(5000, () => {
  console.log("Listening");
});
