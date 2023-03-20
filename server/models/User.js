const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserScheme = new Schema({
  fullname: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  friendsRequestSend: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  friendsRequestReceive: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});
module.exports = mongoose.model("users", UserScheme);
