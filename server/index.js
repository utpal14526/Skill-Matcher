const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
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
app.use("/api", require("./routes/Sendcurrentprofile"));
app.use("/api", require("./routes/FetchFriendsID"));
app.use("/api", require("./routes/Messages"));

const server = app.listen(5000, () => {
  console.log("Listening");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatsocket = socket;
  socket.on("addUser", (id) => {
    onlineUsers.set(id, socket, id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
