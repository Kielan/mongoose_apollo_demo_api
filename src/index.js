'use strict'
global.Promise = require('bluebird')
const fs = require('fs')
const db = require('./db')
const express = require('express')
const passport = require('passport')
const helmet = require('helmet')
const { json, urlencoded  } = require('body-parser')
const { createServer } = require('https')
const { subscribe, execute } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const { dbConfig, appConfig } = require('./config')
const schema = require('./schema')
const key = fs.readFileSync('./https/key.pem')
const cert = fs.readFileSync('./https/cert.pem')

const app = express()
app.url = `${appConfig.url}:${appConfig.port}`
app.db = db

require('./config/passport')(passport)
app.use(helmet())
// configure the app to use bodyParser()
app.use(urlencoded({ extended: true }));
app.use(json())

// routes
require('./routes')(app, passport)

const server = createServer({ key: key, cert: cert }, app)

server.listen(appConfig.port, err => {
  if (err) throw err;
  new SubscriptionServer(
    {
      schema,
      execute,
      subscribe,
      onConnect: () => console.log('Client connected')
    },
    {
      server,
      path: '/subscriptions'
    }
  )

  console.log(`> Ready on PORT`)
})
