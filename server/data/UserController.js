const User = require("../models/User");
const { UserInputError } = require("apollo-server-express");

const Controller = {
  // User Method
  getUser: async (userId) => {
    return await User.findById(userId);
  },
  getUsers: async (list = null) =>
    list === null
      ? await User.find()
      : await User.find({ _id: { $in: list } }),
  createUser: async (input) => {
    const newUser = new User(input);
    return await newUser.save();
  },
  editUser: async ({ id, input }) => {
    const newUser = await User.findOneAndUpdate({ _id: id }, input, {
      new: true,
    });
    return newUser;
  },
  //   REQUEST FRIEND
  reqFriend: async ({ revFriendID, userId }) => {
    // Check for existing user of friend request
    const friendUser = await User.findById(revFriendID);
    if (!friendUser)
      throw new UserInputError("You request for Invalid user");
    // Check for friendship request avaiable
    const addFriendCondition1 = await User.findOne({
      _id: userId,
      $or: [
        { friends: { $elemMatch: { $eq: friendUser._id } } },
        {
          friendsRequestSend: {
            $elemMatch: { $eq: friendUser._id },
          },
        },
        {
          friendsRequestReceive: {
            $elemMatch: { $eq: friendUser._id },
          },
        },
      ],
    });
    const addFriendCondition2 = await User.findOne({
      _id: friendUser._id,
      $or: [
        { friends: { $elemMatch: { $eq: userId } } },
        {
          friendsRequestSend: { $elemMatch: { $eq: userId } },
        },
        {
          friendsRequestReceive: {
            $elemMatch: { $eq: userId },
          },
        },
      ],
    });
    if (friendUser._id == userId)
      throw new UserInputError("You can not request for yourself");
    if (addFriendCondition1 || addFriendCondition2)
      throw new UserInputError("You guy have requested before");
    // All good
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { friendsRequestSend: friendUser._id } }
    );
    await User.findOneAndUpdate(
      { _id: friendUser._id },
      { $push: { friendsRequestReceive: userId } }
    );
  },
  //   ACCEPT FRIEND
  acceptFriend: async ({ reqFriendID, userId }) => {
    const RequesterCondition = {
      _id: reqFriendID,
      friendsRequestSend: { $elemMatch: { $eq: userId } },
    };

    const ReceivedCondition = {
      _id: userId,
      friendsRequestReceive: { $elemMatch: { $eq: reqFriendID } },
    };

    const requester = await User.findOneAndUpdate(
      RequesterCondition,
      {
        $push: { friends: userId },
        $pull: { friendsRequestSend: userId },
      }
    );
    const receiver = await User.findOneAndUpdate(ReceivedCondition, {
      $push: { friends: reqFriendID },
      $pull: { friendsRequestReceive: reqFriendID },
    });
    if (!requester || !receiver)
      throw new UserInputError(
        "Requester/Received not found or user not authorized"
      );
  },
  //   DELETE FRIEND
  deleteFriend: async ({ friendID, userId }) => {
    const RequesterCondition = {
      _id: friendID,
      $or: [
        { friends: { $elemMatch: { $eq: userId } } },
        {
          friendsRequestSend: {
            $elemMatch: { $eq: userId },
          },
        },
        {
          friendsRequestReceive: {
            $elemMatch: { $eq: userId },
          },
        },
      ],
    };

    const ReceivedCondition = {
      _id: userId,
      $or: [
        { friends: { $elemMatch: { $eq: friendID } } },
        {
          friendsRequestSend: {
            $elemMatch: { $eq: friendID },
          },
        },
        {
          friendsRequestReceive: {
            $elemMatch: { $eq: friendID },
          },
        },
      ],
    };

    const RequesterUpdated = await User.findOneAndUpdate(
      RequesterCondition,
      {
        $pull: {
          friends: userId,
          friendsRequestSend: userId,
          friendsRequestReceive: userId,
        },
      }
    );
    const ReceivedUpdated = await User.findOneAndUpdate(
      ReceivedCondition,
      {
        $pull: {
          friends: friendID,
          friendsRequestSend: friendID,
          friendsRequestReceive: friendID,
        },
      }
    );
    if (!RequesterUpdated || !ReceivedUpdated)
      throw new UserInputError(
        "Requester/Received not found or user not authorized"
      );
  },
};
module.exports = { Controller };
