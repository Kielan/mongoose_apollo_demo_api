'use strict'
const tools = require('auto-load')('src/tools')
const Validators = require('../../tools/validators')

const Users = function(Schema) {
  var UsersSchema = Schema({
    email: { type: String, unique: true, required: true, },//validate: Validators.emailValidator },
    password: {type: String, required: true },
    token: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    expires_at: { type: Date },
  }, { collection: 'Users', discriminatorKey: 'role' })
    .index({ email: 1, password: 1 }, { unique: true })
    .index({ email: 1 })

    UsersSchema.methods.tokenNew = function() {
      let days = 7
      let token = tools.generateToken()
      let expires = new Date()
      expires.setDate(expires.getDate() + days)
      return this.update({expires: expires, token: token}).then(() => this)
    }
    UsersSchema.statics.check = function(email,pass) {
      // auth and return user promise (user.token)
      return tools.userAuth(this,email,pass)
        .then(user => {
          if (!user) {
            return false
          } else {
            return user.tokenNew()
              .then(data => {
                delete data.password
                return data
              });
          }
        })
    }
  return UsersSchema
}
module.exports = Users
