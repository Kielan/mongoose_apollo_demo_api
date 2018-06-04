'use strict'
const {
  GraphQLID,
  GraphQLString
} = require('graphql')
const {logConfig: {error: {options: {console}}}} = require('../config')

module.exports = {
  type: require('../types/user'),
  description: 'Email, id or token required.',
  args: {
    id: {
      name: 'id',
      type: GraphQLID,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
    token: {
      name: 'token',
      type: GraphQLString,
    }
  },
  resolve: (
    root,
    data,
    { req: {user, app: {db: Users}}},
    fieldASTs
  ) => {
    if(Object.keys(data).length !== 0) {
      return Users.findOne({where: {userId: user.id}})
        .then(provider => {
          let k = Object.keys(data)[0]
          let q = {
            where: {}
          };
          q.where.practiceId = provider.practiceId;
          var key = "$user."+k+"$";
          q.where[key] = data[k];
          return Users.findOne(q)
            .then(user => {
              if(user) {
                let result = user.get()
                delete result.password
                return result;
              } else {
                return 'User not found';
              }
          });
        })
    } else {
      return 'User not found';
    }
  }
}
