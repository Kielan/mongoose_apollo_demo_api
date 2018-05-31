'use strict'
const {
  graphqlExpress,
  graphiqlExpress,
} = require('apollo-server-express')
const schema = require('../schema')

exports.api = graphqlExpress((req, res) => ({context: { req, res }, schema: schema })) // user schema
exports.docs = graphiqlExpress((req) => { // GraphiQL view
  let url = req.app.url.replace('https:','wss:')
  return {
    endpointURL: '/api',
    subscriptionsEndpoint: `${url}/subscriptions`,
    passHeader: `'Authorization': 'Bearer ${req.user.token}'` // forward user's token (set by passport)
  }
})
