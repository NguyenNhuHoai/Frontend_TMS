const express = require("express");
const sequelize = require("./config/sequelize");
const bodyParser = require("body-parser");
const models = require("./models/models");
const typeDefs = require("./schemas/schema");
const resolvers = require("./resolvers/resolvers");
const { ApolloServer } = require("apollo-server-express");
const databaseGraphQL = require("./data/database");

const app = express();

app.use(bodyParser.json());

sequelize
  .sync()
  .then(() => {
    console.log("Tables synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing tables", err);
  });

// models.Specification.findAll()
//   .then((users) => {
//     console.log(
//       "Danh sách người dùng:",
//       users.map((user) => user.dataValues)
//     );
//   })
//   .catch((error) => {
//     console.error("Lỗi:", error);
//   });

async function startServer() {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ databaseGraphQL }),
  });
  await server.start();
  server.applyMiddleware({ app });
}
startServer();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5000;
app.listen(port, () => {
  console.log(`Server ready at http://localhost:5000${server.graphqlPath}`);
});
