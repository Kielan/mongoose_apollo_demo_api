'use strict'
var limit;
exports.limit = limit = 5;
exports.admin = {};
exports.views = {};
exports.admin.views = {};

/* json endpoints */
exports.auth = function(req,res) {
  return req.app.db.Users.check(req.body.email,req.body.password)
    .then(user => {
      if(!user) {
        return res.json({data: {user: null}})
      } else {
        return req.app.db.Providers.findOne({
          where:{userId:user.id},
          include:[
            {model:req.app.db.Practices, include:[
              {model:req.app.db.Providers, as: 'surgeon', include:[{model:req.app.db.Profiles, include:[req.app.db.Links]}]},
              {model:req.app.db.Profiles, include:[req.app.db.Links]}
            ]}
          ]
        }).then(pro => {
            if(pro) {
              delete user.password;
              return res.json({data: {user: user, profile: pro}})
            } else {
              return res.json({data: {user: null}})
            }
        })
        }
    })
}
