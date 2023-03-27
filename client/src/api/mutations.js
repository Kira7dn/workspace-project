import { gql } from "@apollo/client";

const DELETE_SPACE = gql`
  mutation deleteSpaceMutation($id: ID!) {
    deleteSpace(id: $id) {
      title
    }
  }
`;
const CREATE_SPACE = gql`
  mutation CREATE_SPACE($input: SpaceInput) {
    addSpace(input: $input) {
      id
      title
      description
      image
      members {
        id
        fullname
        username
        avatar
      }
    }
  }
`;
const CREATE_POST = gql`
  mutation CREATE_POST($input: PostInput) {
    addPost(input: $input) {
      content
      media
    }
  }
`;
const DELETE_POST = gql`
  mutation DELETE_POST($deletePostId: ID!) {
    deletePost(id: $deletePostId) {
      id
    }
  }
`;
const UPDATE_SPACE = gql`
  mutation UPDATE_SPACE($updateSpaceId: ID!, $input: SpaceInput) {
    updateSpace(id: $updateSpaceId, input: $input) {
      id
      title
      description
      image
      members {
        id
        fullname
        username
        avatar
      }
    }
  }
`;
const NEW_PROJECT = gql`
  mutation NEW_PROJECT($parentId: ID, $input: ProjectInput) {
    addProject(parentId: $parentId, input: $input) {
      id
      title
      description
      target
      deadline
      leader {
        id
        fullname
        username
        avatar
      }
      members {
        id
        fullname
        username
        avatar
      }
      progress
      children {
        id
        title
        deadline
        progress
      }
    }
  }
`;
const UPDATE_PROJECT = gql`
  mutation UPDATE_PROJECT($input: ProjectInput, $projectId: ID!) {
    updateProject(input: $input, projectId: $projectId) {
      id
      title
      description
      target
      deadline
      progress
      user {
        id
        fullname
        username
        avatar
      }
      leader {
        id
        fullname
        username
        avatar
      }
      members {
        id
        fullname
        username
        avatar
      }
      children {
        id
        title
        description
        target
        deadline
        progress
      }
    }
  }
`;
const DELETE_PROJECT = gql`
  mutation Mutation($targetId: ID!) {
    deleteProject(id: $targetId) {
      id
    }
  }
`;
export {
  DELETE_SPACE,
  CREATE_SPACE,
  UPDATE_SPACE,
  NEW_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  CREATE_POST,
  DELETE_POST,
};
