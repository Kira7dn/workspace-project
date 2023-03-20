const Post = require("../models/Post");
const { UserInputError } = require("apollo-server-express");

const Controller = {
  getPost: async ({ id }) => {
    return await Post.findById(id);
  },
  getPosts: async (userId) =>
    userId === null ? await Post.find() : await Post.find({ user: userId }),
  createPost: async ({ input, userId }) => {
    const newPost = new Post({
      ...input,
      user: userId,
    });
    return await newPost.save();
  },
  updatePost: async ({ id, input, userId }) => {
    const Condition = {
      _id: id,
      user: userId,
    };
    const updatedPost = await Post.findOneAndUpdate(Condition, input, {
      new: true,
    });
    if (!updatedPost)
      throw new UserInputError("Post not found or user not authorized");
    return updatedPost;
  },
  deletePost: async ({ id, userId }) => {
    const Condition = {
      _id: id,
      user: userId,
    };
    const deletedPost = await Post.findOneAndDelete(Condition);
    if (!deletedPost)
      throw new UserInputError("Post not found or user not authorized");
    return deletedPost;
  },
};
module.exports = { Controller };
