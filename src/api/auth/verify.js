const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('jwt.secret');
const InvalidTokenRepo = require('../db/invalidToken.js');

let token = {

  isValidToken: (token) => {

    

    return true;
  },

  verifyToken: (req, res, next) => {

    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if (token) { // cehck it is not in invalidToken
      InvalidTokenRepo.exists({'token': token}, (err, r) => {
        if (err || r) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          jwt.verify(token, secret, (err, decoded) => {
            if (err) {
              return res.json({
                success: false,
                message: 'Token is not valid'
              });
            } else {
              req.decoded = decoded;
              next();
            }
          });
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  }
}

module.exports = {
  verifyToken: token.verifyToken
}