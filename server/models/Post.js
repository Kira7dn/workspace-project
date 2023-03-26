const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
  content: {
    type: "string",
    required: true,
  },
  media: {
    type: "string",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  retweet: {
    type: "number",
    default: 0,
  },
  like: {
    type: "number",
    default: 0,
  },
  view: {
    type: "number",
    default: 0,
  },
});
module.exports = mongoose.model("posts", ProjectSchema);
