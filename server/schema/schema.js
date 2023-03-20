const { merge } = require("lodash");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDef: User, resolvers: userResolvers } = require("./user");
const { typeDef: Space, resolvers: spaceResolvers } = require("./space");
const { typeDef: Project, resolvers: projectResolvers } = require("./project");
const { typeDef: Post, resolvers: postResolvers } = require("./post");
const { typeDef: Comment, resolvers: commentResolvers } = require("./comment");

const schema = makeExecutableSchema({
  typeDefs: [User, Space, Project, Post, Comment],
  resolvers: merge(
    userResolvers,
    spaceResolvers,
    projectResolvers,
    postResolvers,
    commentResolvers
  ),
});
module.exports = { schema };
