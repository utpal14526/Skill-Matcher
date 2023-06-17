const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    COLLEGENAME: {
      type: String,
      require: true,
    },

    USERID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    YEAROFGRADUATION: {
      type: String,
    },

    LINKEDINID: {
      type: String,
    },

    PORTFOLIOLINK: {
      type: String,
    },

    SELECTINTERESTS: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("profile", ProfileSchema);
