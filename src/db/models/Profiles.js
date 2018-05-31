'use strict'
const mongoose = require('./connection')
const Validators = require('../tools/validators')

module.exports = function(Schema, extend) {
  const Profile = new Schema({
    firstName: { type: String, required: true, trim: true, validate: Validators.nameValidator },
  	lastName: { type: String, required: true, trim: true, validate: Validators.nameValidator },
    phone: { type: String },
    dob: { type: String },
    address: { type: String },
    bio: { type: String },
    profileStatus: { type: String },
    createdAt: { type: String },
    updatedAt: { type: String },
  })

  return {
    profile: Profile,
  }
}
