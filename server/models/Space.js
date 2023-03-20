const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SpaceSchema = new Schema({
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
  },
  image: {
    type: "string",
    default:
      "https://pngset.com/images/icon-vmware-workspace-one-clipart-vertical-symbol-logo-trademark-rug-transparent-png-2504111.png",
  },
  rank: {
    type: "number",
    enum: [1, 2, 3, 4, 5],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "projects",
    },
  ],
});
module.exports = mongoose.model("spaces", SpaceSchema);
