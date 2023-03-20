export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080/graphql"
    : "https://shrouded-caverns-39567.herokuapp.com/api";
