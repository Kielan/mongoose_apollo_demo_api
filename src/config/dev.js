'use strict'
const generateToken = require('../tools/generateToken')

exports.appConfig = {
  url: process.env.API_URL || 'https://api.graphqldemo.com',
  port: process.env.API_PORT || 3443,
  secret: process.env.API_SECRET || generateToken(),
}

exports.awsConfig = {
  "accessKeyId": "AKIAJRKTXIYIKI7SHFWA",
  "secretAccessKey": "xYS9gDdDSv2aBq6lKxLblRpntvV+d2z0qOhDGpZX",
  "region": "us-east-1"
}

exports.dbConfig = {
  "DB_DEBUG": false,
  "DB_NAME": 'example_graphql_api',
  "DB_URL": 'mongodb://localhost/',
  "DB_ARCHIVE_NAME": "example_graphql_api_archive"
}
exports.logConfig = {
  dir: __dirname+'/../../log',
  access: {
    fn: 'access.log',
    options: {
      size: '10M',
      compress: 'gzip'
    }
  },
  error: {
    fn: 'error.log',
    options: {
      file: {
        level: 'info',
        handleExceptions: true,
        json: true,
        maxsize: 10485760,
        zippedArchive: true,
        colorize: false
      },
      console: {
        level: 'debug',
        handleExceptions: true,
        //json: true,
        colorize: true
      }
    }
  }
}
