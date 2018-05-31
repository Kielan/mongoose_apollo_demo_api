'use strict'
const mongoose = require('mongoose')
const { dbConfig } = require('../config')

mongoose.connect(dbConfig.DB_URL+dbConfig.DB_NAME, { useMongoClient: true }) //await?
const connection = mongoose.connection

mongoose.set('debug', true)//debug || false)
connection.on('error', function(err) {
  console.log("mongoose ERROR")
  console.log(err)
})
module.exports = mongoose
