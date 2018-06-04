'use strict'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const { dbConfig } = require('../config')

const db = mongoose.createConnection('mongodb://localhost/example_graphql_api');

mongoose.set('debug', true)//debug || false)
db.on('error', function(err) {
  console.log("mongoose ERROR")
  console.log(err)
})

module.exports.mongoose = mongoose
module.exports.db = db
