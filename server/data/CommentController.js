const Comment = require("../models/Comment");
const { UserInputError } = require("apollo-server-express");

const Controller = {
  getComment: async ({ id }) => {
    return await Comment.findById(id);
  },
  getComments: async (postId) =>
    postId === null
      ? await Comment.find()
      : await Comment.find({ post: postId }),
  createComment: async ({ input, userId }) => {
    const newComment = new Comment({
      ...input,
      user: userId,
    });
    return await newComment.save();
  },
  updateComment: async ({ id, input, userId }) => {
    const Condition = {
      _id: id,
      user: userId,
    };
    const updatedComment = await Comment.findOneAndUpdate(Condition, input, {
      new: true,
    });
    if (!updatedComment)
      throw new UserInputError("Comment not found or user not authorized");
    return updatedComment;
  },
  deleteComment: async ({ id, userId }) => {
    const Condition = {
      _id: id,
      user: userId,
    };
    const deletedComment = await Comment.findOneAndDelete(Condition);
    if (!deletedComment)
      throw new UserInputError("Comment not found or user not authorized");
    return deletedComment;
  },
};
module.exports = { Controller };
