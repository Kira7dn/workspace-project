const Space = require("../models/Space");
const { UserInputError } = require("apollo-server-express");

const Controller = {
  getSpace: async ({ id }) => {
    return await Space.findById(id);
  },
  getSpaces: async (userId) =>
    userId === null ? await Space.find() : await Space.find({ user: userId }),
  createSpace: async ({ input, userId }) => {
    const newSpace = new Space({
      ...input,
      user: userId,
    });
    return await newSpace.save();
  },
  updateSpace: async ({ id, input, userId }) => {
    const Condition = {
      _id: id,
      user: userId,
    };
    const updatedSpace = await Space.findOneAndUpdate(Condition, input, {
      new: true,
    });
    if (!updatedSpace)
      throw new UserInputError("Space not found or user not authorized");
    return updatedSpace;
  },
  deleteSpace: async ({ id, userId }) => {
    const Condition = {
      _id: id,
      user: userId,
    };
    const deletedSpace = await Space.findOneAndDelete(Condition);
    if (!deletedSpace)
      throw new UserInputError("Space not found or user not authorized");
    return deletedSpace;
  },
};
module.exports = { Controller };
