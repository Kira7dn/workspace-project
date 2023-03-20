const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getUserId = async (req) => {
  try {
    const token = req.headers.authorization || "";
    const { username } = jwt.decode(token);
    const { _id: userId } = await User.findOne({ username });
    return userId;
  } catch (error) {
    console.log(error);
  }
};
module.exports = getUserId;
