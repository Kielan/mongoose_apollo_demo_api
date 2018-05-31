'use strict'
const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const queries = require('./queries')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries,
    description: 'Users: email, id or token required.'
  }),
})
