const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');

const userSchema = require('./schemas/userSchema');
const employeeSchema = require('./schemas/employeeSchema'); 

const userResolver = require('./resolvers/userResolver');
const employeeResolver = require('./resolvers/employeeResolver'); 

require('dotenv').config();

const app = express();
connectDB();

const server = new ApolloServer({
  typeDefs: [userSchema, employeeSchema], 
  resolvers: [userResolver, employeeResolver], 
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  }
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('✅ Server running on http://localhost:4000/graphql');
  });
}

startServer();
