const typeDef = `
  type Space {
    id: ID
    title: String
    description: String
    image: String
    user: User
    members: [User]
  }
  type Query {
    spaces: [Space]
    space(id: ID!): Space
  }
  input SpaceInput{
    title: String
    description: String
    image: String
    members: [ID]
    projects: [ID]
  }
  type Mutation {
    addSpace(input: SpaceInput): Space
    deleteSpace(id: ID!): Space
    updateSpace(id:ID!, input:SpaceInput): Space
  }
`;

const resolvers = {
  Query: {
    spaces: async (parent, args, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getSpaces(userId),
    space: async (parent, { id }, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getSpace({ userId, id }),
  },
  Space: {
    user: async ({ user }, args, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getUser(user),
    members: async ({ members }, args, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getUsers(members),
  },
  Mutation: {
    addSpace: async (parent, { input }, { mongoDataMethods, userId }) => {
      return await mongoDataMethods.createSpace({ input, userId });
    },
    updateSpace: async (
      parent,
      { id, input },
      { mongoDataMethods, userId }
    ) => {
      return await mongoDataMethods.updateSpace({
        id,
        input,
        userId,
      });
    },
    deleteSpace: async (parent, { id }, { mongoDataMethods, userId }) => {
      return await mongoDataMethods.deleteSpace({ id, userId });
    },
  },
};
module.exports = { typeDef, resolvers };
