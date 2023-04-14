export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080/graphql"
    : "https://workspace-server.azurewebsites.net/graphql";
