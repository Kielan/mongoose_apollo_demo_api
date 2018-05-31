'use strict'
const path = require('path')
const dir = require('fs').readdirSync(__dirname + path.sep)

dir.forEach(function(filename){
  if(path.extname(filename) === '.js' && filename !== 'index.js'){
      var exportAsName = path.basename(filename)
      module.exports[exportAsName.split('.js')[0]] = require( path.join( __dirname, filename) )
  }
})
