'use strict'
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: "User",
  description: 'Email, token or id required for lookup, object for auth purposes.',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    email: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    expires: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
    profileId: {
      type: GraphQLID,
      description: 'Relate a Profile. User has 1 Profile.'
    },
    profile: {
      type: require('./profile'),
      description: 'Provider Profile.'
    },
  })
})
