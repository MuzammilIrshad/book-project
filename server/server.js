const express = require("express");
const path = require("path");
const jwt = require('jsonwebtoken')
const dbConnection = require("./config/connection");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const app = express();
const PORT = process.env.PORT || 3001;

(async()=>{
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (context) => {

    let token
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split('Bearer ')[1]
  
  } else if (context.connection && context.connection.context.Authorization) {
    token = context.connection.context.Authorization.split('Bearer ')[1]
  }

  if (token) {
    jwt.verify(token, 'some very secret key', (err, decodedToken) => {
      context.user = decodedToken
    })
    console.log(context.user);
  }
  return context
  }
});
await server.start()
server.applyMiddleware({ app, path: "/graphql" });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// } else {
//   app.use(express.static(path.join(__dirname, "client", "public")));
//   app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "client", "public", "index.html"));
//   });
// }
dbConnection();

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
})()