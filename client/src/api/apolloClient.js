import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { apiUrl } from "../constants";

const apolloClient = (accessToken) => {
  const httpLink = createHttpLink({ uri: apiUrl });
  const delay = setContext(
    (request) =>
      new Promise((success, fail) => {
        setTimeout(() => {
          success();
        }, 100);
      })
  );
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clients: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          projects: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  });
  const delayLink = ApolloLink.from([delay, httpLink]);
  const authLink = setContext((_, { headers }) => {
    const token = accessToken;
    return {
      headers: {
        ...headers,
        Authorization: token ? token : "",
      },
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(delayLink),
    cache: cache,
    connectToDevTools: true,
  });
  return client;
};
export default apolloClient;
