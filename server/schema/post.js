const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const typeDef = `
  type Post {
    id: ID
    content: String
    media: String
    createdAt: Date
    user: User
    retweet: Int
    like: Int
    view: Int
    comments: [Comment]
  }
  type Query {
    posts: [Post]
    post(id: ID!): Post
  }
  input PostInput{
    content: String
    media: String
    comment: [ID]
    retweet: Int
    like: Int
    views: Int
  }
  type Mutation {
    addPost(input: PostInput): Post
    deletePost(id: ID!): Post
    updatePost(id:ID!, input:PostInput): Post
  }
`;

const resolvers = {
  Date: dateScalar,
  Query: {
    posts: async (parent, args, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getPosts(userId),
    post: async (parent, { id }, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getPost({ userId, id }),
  },
  Post: {
    user: async ({ user }, args, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getUser(user),
    comments: async ({ comments }, args, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getComments(comments),
  },
  Mutation: {
    addPost: async (parent, { input }, { mongoDataMethods, userId }) => {
      return await mongoDataMethods.createPost({ input, userId });
    },
    updatePost: async (parent, { id, input }, { mongoDataMethods, userId }) => {
      return await mongoDataMethods.updatePost({
        id,
        input,
        userId,
      });
    },
    deletePost: async (parent, { id }, { mongoDataMethods, userId }) => {
      return await mongoDataMethods.deletePost({ id, userId });
    },
  },
};
module.exports = { typeDef, resolvers };
