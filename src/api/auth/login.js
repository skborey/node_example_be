const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('jwt.secret');

let login = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {

        /**
         * Email and Password is correct will allow to login to system and get token
         * @Todo
         */
        if (true) {

            let token = jwt.sign({email: email}, secret, { expiresIn: '24h'});

            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });

        } else {
            res.status(403).json({
                success: false,
                message: 'Incorrect email or password'
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
}

module.exports = login;