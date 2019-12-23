const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('jwt.secret');
const InvalidTokenRepo = require('../db/invalidToken.js');

let verifyToken = (req, res, next) => { console.log(req);

  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    /**
     * Token that not expired yet but already logout, shouldn't be invaid, cannot use to login again
     */
    InvalidTokenRepo.exists({'token': token}, (err, isExist) => {

      if (err) { console.log(err);
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error.'
        });
      }

      if (isExist) {
        return res.status(401).json({
          success: false,
          message: 'Token is already used.'
        });
      }

      jwt.verify(token, secret, (err, decoded) => {

        if (err) { console.log(err);
          return res.status(401).json({ 
            success: false,
            message: 'Token is not valid'
          });
        }
    
        req.decoded = decoded;
        req.token = token;
        next();
      });
    });
  } else {
    return res.json({
      success: false, 
      message: 'Auth token is not supplied'
    });
  }
}

module.exports = {
  verifyToken: verifyToken
}