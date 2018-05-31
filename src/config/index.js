'use strict';
const fs = require('fs');
var config;
if(fs.existsSync(__dirname+'/local.js')) {
  config = require('./local.js');
  console.log('config: local');
} else {
  if (process.env.NODE_ENV == 'production') {
    console.log('config:', process.env.NODE_ENV);
    config = require('./prod.js');
    console.log(config.dbConfig.host);
  } else {
    console.log('config: dev', process.env.NODE_ENV);
    config = require('./dev.js');
    console.log(config.dbConfig.host);
  }
}
module.exports = config;
