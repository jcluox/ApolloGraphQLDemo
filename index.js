require('dotenv').config()

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const PORT = process.env.PORT || 4000

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
)
