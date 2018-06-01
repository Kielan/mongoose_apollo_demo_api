'use strict'
var limit;
exports.limit = limit = 5;
exports.admin = {};
exports.views = {};
exports.admin.views = {};

/* json endpoints */
exports.auth = function(req,res) {
  return req.app.db.Users.findOne({email: req.body.email, password: req.body.password})
    .then(user => {
      if(!user) {
        return res.json({data: {user: null}})
      } else {
        return req.app.db.Profiles.findOne(
          {userId:user.id}
        ).then(pro => {
            if(pro) {
              delete user.password;
              return res.json({data: {user: user, profile: pro}})
            } else {
              console.log('b8t somethig happened')
              return res.json({data: {user: null}})
            }
        })
        }
    })
}
