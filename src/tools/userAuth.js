'use strict'
const bcrypt = require('bcryptjs')
module.exports = function (Users,email,password) {
  return Users.findOne({email: email})
    .then(user => {
      if(user && user.email) {// eventually will encrypt like && bcrypt.compareSync(password, user.dataValues.password)){
        return user
      } else {
        return false
      }
  })
}
