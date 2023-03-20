import React from "react";
import ReactDOM from "react-dom";
import App from "~/App";
import GlobalStyles from "./components/GlobalStyle";
import apolloClient from "~/api/apolloClient";
import { ApolloProvider } from "@apollo/client";

const client = apolloClient();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </ApolloProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
