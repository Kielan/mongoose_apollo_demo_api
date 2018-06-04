'use strict'
/* json endpoints */
exports.auth = function(req,res) {
  return req.app.db.Users.check(req.body.email,req.body.password).then(user => {
    if(!user) {
      return res.json({data: {user: null}})
    } else {
      delete user.password;
      return res.json({data: {user: user}})
    }
  })
}
