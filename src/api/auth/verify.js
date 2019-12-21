const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('jwt.secret');
const InvalidTokenRepo = require('../db/invalidToken.js');

let verifyToken = (req, res, next) => {

  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    /**
     * Token that not expired yet but already logout, shouldn't be invaid, cannot use to login again
     */
    InvalidTokenRepo.exists({'token': token}, (err, isExist) => {

      if (err || isExist) {
        return res.json({success: false, message: 'Token is already used.'});
      } else {
        jwt.verify(token, secret, (err, decoded) => { console.log(err);

          if (err) { return res.json({ success: false, message: 'Token is not valid' });
          } else {
            req.decoded = decoded;
            req.token = token;
            next();
          }
        });
      }
    });
  } else {
    return res.json({ success: false, message: 'Auth token is not supplied'});
  }
}

module.exports = {
  verifyToken: verifyToken
}