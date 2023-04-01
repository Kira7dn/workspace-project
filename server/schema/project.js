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
  scalar Date
  type Project {  
    id: ID
    title: String
    description: String
    target: String
    deadline: Date
    user: User
    leader: User
    members: [User]
    progress: Int
    children: [Project]
  }
  type Query {
    projects(spaceId: ID!): [Project]
    project(id: ID!): Project
  }
  input ProjectInput {  
    title: String
    description: String
    target: String
    deadline: Date
    progress: Int
    user: ID
    leader: ID
    members: [ID]
    children: [ID]
  }
  
  type Mutation {
    addProject(parentId: ID, input : ProjectInput): Project
    updateProject(projectId: ID! input : ProjectInput): Project
    deleteProject(id: ID!): Project
  }
`;

const resolvers = {
  Date: dateScalar,
  Query: {
    project: async (parent, { id }, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getProject({ userId, id }),
    projects: async (parent, { spaceId }, { mongoDataMethods }) =>
      await mongoDataMethods.getProjects({ spaceId }),
  },
  Project: {
    user: async ({ user }, args, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getUser(user),
    leader: async ({ leader }, args, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getUser(leader),
    members: async ({ members }, args, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getUsers(members),
    children: async ({ children }, args, { mongoDataMethods, userId }) =>
      await mongoDataMethods.getProjectsByList(children),
  },
  Mutation: {
    addProject: async (
      parent,
      { parentId, input },
      { mongoDataMethods, userId }
    ) => {
      return await mongoDataMethods.createProject({
        parentId,
        input,
        userId,
      });
    },
    updateProject: async (
      parent,
      { projectId, input },
      { mongoDataMethods, userId }
    ) => {
      return await mongoDataMethods.updateProject({
        projectId,
        input,
        userId,
      });
    },
    deleteProject: async (parent, { id }, { mongoDataMethods, userId }) => {
      return await mongoDataMethods.deleteProject({ id, userId });
    },
  },
};
module.exports = { typeDef, resolvers };
