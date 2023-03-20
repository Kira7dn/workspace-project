const Project = require("../models/Project");
const Space = require("../models/Space");
const { UserInputError } = require("apollo-server-express");

const Controller = {
  getProject: async ({ id }) => {
    return await Project.findById(id);
  },
  getProjectsByList: async (list) => {
    return await Project.find({ _id: { $in: list } });
  },
  getProjects: async ({ spaceId, userId }) => {
    const Parent = await Space.findById(spaceId);
    const list = Parent.projects;
    return await Project.find({ _id: { $in: list } });
  },
  createProject: async ({ parentId, input, userId }) => {
    const newProject = new Project({
      ...input,
      user: userId,
    });
    await newProject.save();
    const parentProject = await Project.findOneAndUpdate(
      {
        _id: parentId,
        user: userId,
      },
      { $push: { children: newProject._id } },
      {
        new: true,
      }
    );
    const parentSpace = await Space.findOneAndUpdate(
      {
        _id: parentId,
        user: userId,
      },
      { $push: { projects: newProject._id } },
      {
        new: true,
      }
    );
    return newProject;
  },
  updateProject: async ({ projectId, input, userId }) => {
    const Condition = {
      _id: projectId,
      user: userId,
    };
    const updated = await Project.findOneAndUpdate(Condition, input, {
      new: true,
    });
    if (!updated)
      throw new UserInputError(
        "Project not found or user not authorized"
      );
    return updated;
  },
  deleteProject: async ({ id, userId }) => {
    const Condition = {
      _id: id,
      user: userId,
    };
    const deletedSpace = await Project.findOneAndDelete(Condition);
    if (!deletedSpace)
      throw new UserInputError(
        "Project not found or user not authorized"
      );
    return deletedSpace;
  },
};
module.exports = { Controller };
