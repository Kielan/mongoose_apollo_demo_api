'use strict'
const express = require('express')
const {
  User,
  GraphQL,
  Todo,
} = require('./controllers')
const { appConfig } = require('./config')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cookieParser = require('cookie-parser')
const mongooseConnection = require('./db/connection');

module.exports = function(app, passport) {
  /* middleware */
  const hasValidToken = function(req,res,next) {
    if (req.query && req.query.token) { // token provided via GET?
      return req.app.db.Users.findByToken(req.query.token)
        .then(user => {
          if(user) {
            return next()
          } else {
            return res.json({data: null, error: {message: 'Invalid Token'}})
          }
        });
    } else {
      return passport.authenticate("bearer", { session: false })(req,res,next) // passport token auth dep
    }
  }
  // CORS for APIs
  app.use(['/api/'],
  function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Method", "POST")
    res.header("Access-Control-Max-Age", 600000)
    if ('OPTIONS' === req.method) {
      res.send(200) // handle preflight
    } else {
      next() // on to endpoints
    }
  })
  app.post('/api/', hasValidToken, GraphQL.api) // User GraphQL API endpoint
  app.post('/api/auth/', User.auth)

  /* sessions for routes below */
  const expires = new Date()
  expires.setDate(expires.getDate() + 1) // 24 hour expiry
  function extendDefaultFields(defaults, session) {
    let userId = (session.passport) ? session.passport.user : null;
    return {
      data: defaults.data,
      expires: defaults.expires,
      userId: userId
    };
  }
  app.use(session({
    key: 'sid',
    secret: appConfig.secret,
    store: new MongoStore({
      mongooseConnection: mongooseConnection.connection,
      session: 'Users'
    }),
    cookie: { secure: true, sameSite: true, expires: expires},
    resave: false,
    saveUninitialized: false,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(cookieParser(appConfig.secret))

  // GraphiQL
  app.get('/gql', GraphQL.docs) // GraphiQL view

  /* 404 *.else */
  app.use('*',(req,res) => { res.sendStatus(404) })  // [TODO] error view
}
