'use strict'
const mongoose = require('mongoose')
const { dbConfig } = require('../config')

const connection = mongoose.connection

mongoose.set('debug', true)//debug || false)
connection.on('error', function(err) {
  console.log("mongoose ERROR")
  console.log(err)
})

module.exports = mongoose
