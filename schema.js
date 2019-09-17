const { gql } = require('apollo-server-express')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    "打招呼"
    hello: String
    "當前使用者"
    me: User 
    users: [User!]!

    "帶參數的範例"
    user(name: String!): User
  }

  enum HeightUnit {
    "公尺"
    METRE,
    "公分"
    CENTIMETRE,
    "英尺"
    FOOT 
  }

  type User {
    id: ID
    name: String
    age: Int
    "朋友們"
    friends: [User!]!
    height(unit: HeightUnit = METRE): Float!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    author: User
    title: String
    content: String
    likeGivers: [User]!
  }

  type Mutation {
    "new a post"
    addPost(title: String!, content: String!): Post
    "like/dislike"
    likePost(postId: ID!): Post
  }
`

module.exports = typeDefs