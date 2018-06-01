'use strict'
const mongoose = require('./connection')
const Validators = require('../tools/validators')

module.exports = function(Schema, extend) {
  const User = new Schema({
  	email: { type: String, unique: true, required: true, validate: Validators.emailValidator },
    password: {type: String, required: true },
  	token: { type: String },
  	created_at: { type: Date, default: Date.now },
  	updated_at: { type: Date, default: Date.now },
  	expires_at: { type: Date },
  }, { collection: 'users', discriminatorKey: 'role' })
  	.index({ email: 1, password: 1 }, { unique: true })
  	.index({ email: 1 })

  return {
  	user: User,
  },
}
