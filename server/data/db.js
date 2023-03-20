const { Controller: userController } = require("./UserController");
const { Controller: spaceController } = require("./SpaceController");
const { Controller: projectController } = require("./ProjectController");
const { Controller: postController } = require("./PostController");
const { Controller: commentController } = require("./CommentController");

const mongoDataMethods = {
  ...userController,
  ...spaceController,
  ...projectController,
  ...postController,
  ...commentController,
};
module.exports = mongoDataMethods;
