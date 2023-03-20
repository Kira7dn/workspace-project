const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
  content: {
    type: "string",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "posts",
  },
});
module.exports = mongoose.model("comments", ProjectSchema);
