// const jwt = require('jsonwebtoken')
const resFail = require('../responses/res-fail');
const jwt = require('../jwt');
let permissionModel = require('../modules/permissions/model');

module.exports = {
  requireByPermission: (permission) => {
    return async (req, res, next) => {
      // console.log('permission: ', permission);
      try {
        let per = await permissionModel.findByLambda({
          name: permission
        });

        console.log('_id: ', per[0]._id);

        let token =
          req.body.token || req.query.token || req.headers.authorization;
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length).trimLeft();
        }
        if (token) {
          let payload = jwt.decode(token);
          req.payload = payload;
          console.log(
            'payload.account.permission: ',
            payload.account.permission_id
          );

          let checkPermission = payload.account.permission_id.find(
            (id) => id == per[0]._id
          );
          console.log('checkPermission: ', checkPermission);
          if (checkPermission) {
            next();
          } else {
            res.status(403).json(resFail(1, 'Invaild token'));
          }
        } else {
          res.status(403).json(resFail(1, 'Do not send token'));
        }
      } catch (error) {
        res.status(403).json(resFail(1, error));
      }
    };
  },

  requireGetPerson: async (req, res, next) => {
    try {
      let token =
        req.body.token || req.query.token || req.headers.authorization;
      if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
      }
      if (token) {
        let payload = jwt.decode(token);
        req.payload = payload;
        // console.log('payload.account: ', payload.account);
        if (payload.account._id === req.params.id) {
          next();
        } else {
          res.status(403).json(resFail(1, 'Invaild token'));
        }
      } else {
        res.status(403).json(resFail(1, 'Do not send token'));
      }
    } catch (error) {
      res.status(403).json(resFail(1, error));
    }
  }
};
