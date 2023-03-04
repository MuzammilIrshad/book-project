const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    token:String
  }
  type UserData{
    user:User
    savedBooks:[Book]
  }
  type Book {
    bookId: String
    userId:String
    authors: [String]
    description: String
    image: String
    title: String
  }
  type Auth {
    user: User
  }
  input BookInput {
    authors: [String]
    bookId:String
    userId:String
    description: String
    title: String
    image: String
  } 
  type Query {
    me(id:String!): UserData
    removeBook(bookId: String!): Book
    login(email: String!, password: String!): Auth
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): Book
  }
`;

module.exports = typeDefs;
