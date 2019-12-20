const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get("jwt.secret");
const UserRepo = require('../db/user.js');
const bcrypt = require('bcrypt');

let login = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {

        /**
         * Email and Password is correct will allow to login to system and get token
         */
        UserRepo.findOne({email: email}, (err, user) => {
            if (err) {
                return res.status(500).json({success: false, message: 'Internal error'});
            } else if (user) {
                /**
                 * Check hash password
                 */
                if(bcrypt.compareSync(password, user.password)) {
                    let token = jwt.sign({email: email}, secret, { expiresIn: '24h'});
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                } else {
                    return res.json({success: false, message: 'Incorrect email or password.'});
                }
            } else {
                return res.json({success: false, message: 'User is not exist.'});
            }
        });
    } else {
        res.json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
}

module.exports = login;