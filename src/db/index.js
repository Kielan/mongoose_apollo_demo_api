'use strict'
const extend = require('mongoose-schema-extend')
const fs = require('fs')
const path = require('path')
const {db, mongoose} = require('./connection')
const models = [
  'Users',
]
var model = {} // the list of mongoose schemas
var Schema = mongoose.Schema
var model_directory = path.join(__dirname, '/models/')
var files = fs.readdirSync(model_directory) //array of file name strings
files.splice(0, 1)

//oop strategy to extend the schema models with methods
models.forEach(function(name) {
  var modeDirIndexLoc = path.join(model_directory, name)
  model[name] = require(modeDirIndexLoc)(Schema)
})

models.forEach(function(name, index) { // export our assocated models
  db[name] = db.model(name, model[name])
})
module.exports = db
