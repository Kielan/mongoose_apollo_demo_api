'use strict'
const fs = require('fs')
const express = require('express')
const passport = require('passport')
const helmet = require('helmet')
const { json, urlencoded  } = require('body-parser')
const { createServer } = require('https')
const { subscribe, execute } = require('graphql')

const { appConfig, dbConfig } = require('./config')
const schema = require('./schema')
const mongoose = require('./db/connection')
const key = fs.readFileSync('./https/key.pem')
const cert = fs.readFileSync('./https/cert.pem')

const app = express()
app.url = `${appConfig.url}:${appConfig.port}`
app.db = mongoose.connection

// configure
require('./config/passport')(passport)
app.use(helmet())
app.use(json())

// routes
require('./routes')(app, passport)

const server = createServer({ key: key, cert: cert }, app)

server.listen(appConfig.port, err => {
  if (err) throw err;
})
