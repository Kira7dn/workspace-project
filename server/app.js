require("dotenv").config();
const { schema } = require("./schema/schema");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const getUserId = require("./ulti/getUserId");
const DB_URI =
  "mongodb+srv://kira7dn1:Setsuna0611@mern.uliaw.mongodb.net/mern?retryWrites=true&w=majority";
const { createServer } = require("http");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const httpServer = createServer(app);
const mongoDataMethods = require("./data/db");
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    // const userId = await getUserId(req);
    const userId = "61d067dc596cdedd21b5b8e8";
    return {
      mongoDataMethods,
      userId,
    };
  },
});

async function start() {
  await server.start();
  server.applyMiddleware({ app });
  const PORT = process.env.PORT || 8080;
  httpServer.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT}/graphql`)
  );
  // return { server, app };
}
start();
