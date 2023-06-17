const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageModel = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },

    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

// chatName
// isGroupChat
// users
// lastestMessage
// groupAdmin

module.exports = mongoose.model("Message", messageModel);

//this is how y create schema in node js
