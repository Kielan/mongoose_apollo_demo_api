'use strict'
const LocalStrategy = require('passport-local').Strategy
const TokenStrategy = require("passport-http-bearer").Strategy
const db = require('../db/connection')

module.exports = function(passport) {
  // user auth from passport local
  passport.serializeUser(function(user, done) {
    done(null, user.id); // serialize id
  })
  passport.deserializeUser(function(id, done) {
    db.Users.findById(id) // get user by id
      .then(user => done(null, user))
  })
  passport.use(new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      db.Users.check(email,password)
        .then(user => {
          if (!user) {
           return done(null, false, req.flash('loginMessage', 'Invalid credentials provided. Please, try again.'))
          } else if (!user.status) {
            return done(null, false, req.flash('loginMessage', 'User account has been disabled. Contact your administrator for more information.'))
          } else {
            return done(null, user);
          }
        })
    }
  ));
  // token auth from passport bearer
  passport.use(new TokenStrategy((token, next) => {
    db.Users.findByToken(token)
      .then(user => {
        if (!user || user.status == null) {
          return next(null, false);
        } else {
          return next(null, user);
        }
      })
  }))
}
