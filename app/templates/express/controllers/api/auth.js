'use strict';

let AuthController = {};
let Users = require('../../models').users;
let config = require('../../config');
let jwt = require('jsonwebtoken');
let encode = require('../../helpers/encode.<%= extScript %>');
let publicFields = '-__v -password';

AuthController.local = function(req, res) {
  let password = encode(req.body.password);
  Users
    .findOne({email: req.body.email, password: password}, publicFields)
    .then(function(user) {
      if (!user) {
        return res.status(400).json({
          message: 'authentication failed'
        });
      }

      res.json({
        id: user._id,
        token: jwt.sign(user, config.secret, config.token)
      });
    });
};

module.exports = AuthController;