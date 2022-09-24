const fs = require("fs");

const express = require("express");
const app = express();

const { ApolloServer } = require("apollo-server-express");
const dateScalar = require("./graphql_type.js");

const employees = require("./employees.js");

require("./models/db.js");
require("dotenv").config();

const port = process.env.PORT || 4000;
const enableCors = (process.env.EnableCors || `true`) == `true`;

const resolvers = {
  Date: dateScalar,
  Query: {
    listAllEmployees: employees.listAllEmployees,
    listSingleEmployee: employees.listSingleEmployee,
  },
  Mutation: {
    createEmployee: employees.createEmployee,
    updateEmployee: employees.updateEmployee,
    deleteEmployee: employees.deleteEmployee,
  },
};

const typeDefs = fs.readFileSync("./schema_graphql", "utf-8");
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql", cors: enableCors });
});

app.use(express.static("ui/public"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
