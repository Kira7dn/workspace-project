import { gql } from "@apollo/client";

const GET_SPACES = gql`
  query getSpacesQuery {
    spaces {
      id
      title
      description
      image
      user {
        fullname
        id
        avatar
        username
      }
      members {
        id
        fullname
        username
        avatar
      }
    }
  }
`;
const GET_FRIENDS = gql`
  query getFriendsQuery {
    users {
      id
      username
      fullname
      avatar
    }
  }
`;
const GET_POSTS = gql`
  query getPostsQuery {
    posts {
      comments {
        content
        createdAt
        id
        user {
          id
          fullname
          avatar
        }
      }
      content
      createdAt
      id
      like
      media
      retweet
      view
      user {
        id
        fullname
        username
        avatar
        icon
      }
    }
  }
`;
// const GET_PROJECTS = gql`
//   query getProjectsQuery($spaceId: ID!) {
//     projects(spaceId: $spaceId) {
//       id
//       title
//       description
//       target
//       deadline
//       leader {
//         id
//         fullname
//         username
//         avatar
//       }
//       members {
//         id
//         fullname
//         username
//         avatar
//       }
//       progress
//       children {
//         id
//         title
//         deadline
//         progress
//       }
//     }
//   }
// `;
// const GET_PROJECT = gql`
//   query GET_PROJECT($projectId: ID!) {
//     project(id: $projectId) {
//       id
//       title
//       description
//       target
//       deadline
//       leader {
//         id
//         fullname
//         username
//         avatar
//       }
//       members {
//         id
//         fullname
//         username
//         avatar
//       }
//       progress
//       children {
//         id
//         description
//         title
//         target
//         deadline
//         progress
//       }
//     }
//   }
// `;

export {
  GET_SPACES,
  GET_FRIENDS,
  GET_POSTS,
  // GET_PROJECTS,
  // GET_PROJECT
};
