const typeDef = `
  type User {
    id: ID
    fullname: String
    username: String
    avatar: String
    icon: String
    friends: [User]
    friendsRequestSend: [User]
    friendsRequestReceive: [User]
  }
  type Query {
    users: [User]
    user: User
    singleUser(id:ID!): User
  }
  input UserInput{
    id: ID
    password: String
    fullname: String
    username: String
    icon: String
    avatar: String
    friends: [ID]
    friendsRequestSend: [ID]
    friendsRequestReceive: [ID]
  }
  type Mutation {
    createUser(input: UserInput): User
    editUser(id: ID! input: UserInput): User
    deleteUser(id: ID!): User
    requestFriend(id: ID!): User
    acceptFriend(id: ID!): User
    deleteFriend(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    users: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getUsers(),
    user: async (parent, { id }, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getUser(userId),
    singleUser: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getUser(id),
  },
  User: {
    friends: async ({ friends }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getUsers(friends),
    friendsRequestSend: async (
      { friendsRequestSend },
      args,
      { mongoDataMethods }
    ) => await mongoDataMethods.getUsers(friendsRequestSend),
    friendsRequestReceive: async (
      { friendsRequestReceive },
      args,
      { mongoDataMethods }
    ) => await mongoDataMethods.getUsers(friendsRequestReceive),
  },
  Mutation: {
    createUser: async (parent, { input }, { mongoDataMethods }) => {
      return await mongoDataMethods.createUser(input);
    },
    editUser: async (parent, { id, input }, { mongoDataMethods }) => {
      return await mongoDataMethods.editUser({ id, input });
    },
    requestFriend: async (parent, { id }, { mongoDataMethods, userId }) => {
      return await mongoDataMethods.reqFriend({
        revFriendID: id,
        userId,
      });
    },
    acceptFriend: async (parent, { id }, { mongoDataMethods, userId }) => {
      return await mongoDataMethods.acceptFriend({
        reqFriendID: id,
        userId,
      });
    },
    deleteFriend: async (parent, { id }, { mongoDataMethods, userId }) => {
      return await mongoDataMethods.deleteFriend({
        friendID: id,
        userId,
      });
    },
  },
};
module.exports = { typeDef, resolvers };
