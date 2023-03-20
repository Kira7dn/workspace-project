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
  type Comment {
    id: ID
    content: String
    user: User
    createdAt: Date
    post: Post
  }
  type Query {
    comments(postId: ID!): [Comment]
    comment(id: ID!): Comment
  }
  input CommentInput{
    content: String
  }
  type Mutation {
    addComment(input: CommentInput): Comment
    deleteComment(id: ID!): Comment
    updateComment(id:ID!, input:CommentInput): Comment
  }
`;

const resolvers = {
  Date: dateScalar,
  Query: {
    comments: async (parent, { postId }, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getComments(postId),
    comment: async (parent, { id }, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getComment({ id }),
  },
  Comment: {
    user: async ({ user }, args, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getUser(user),
  },
  Mutation: {
    addComment: async (parent, { input }, { mongoDataMethods, userId }) => {
      return await mongoDataMethods.createComment({ input, userId });
    },
    updateComment: async (
      parent,
      { id, input },
      { mongoDataMethods, userId }
    ) => {
      return await mongoDataMethods.updateComment({
        id,
        input,
        userId,
      });
    },
    deleteComment: async (parent, { id }, { mongoDataMethods, userId }) => {
      return await mongoDataMethods.deleteComment({ id, userId });
    },
  },
};
module.exports = { typeDef, resolvers };
