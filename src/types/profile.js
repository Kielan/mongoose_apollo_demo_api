'use strict'
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: "Profile",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    firstName: {
      type: GraphQLString
    },
    middleName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    },
    bio: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    },
    userId: {
      type: GraphQLID,
      description: 'Relate a User. Provider has 1 User.'
    },
    user: {
      type: require('./user'),
      description: 'Related User object'
    },
    profileStatus: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
  })
})
