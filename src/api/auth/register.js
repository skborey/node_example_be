const UserRepo = require('../db/user.js');
const bcrypt = require('bcrypt');

let register = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {

        /**
         * Check the existing email
         */
        UserRepo.exists({'email': email}, (err, r) => {
            if (err) {
                return res.status(500).json({success: false, message: 'Internal error'});
            } else if (r) {
                return res.json({success: false, message: 'Email is already exist.'});
            } else {
                /**
                 * Create new user
                 */
                let hash = bcrypt.hashSync(password, 10);

                UserRepo.insertMany({email: email, password: hash}, (err, r) => {
                    if (err) {
                        return res.status(500).json({success: false, message: 'Internal error'});
                    } else {
                        return res.json({
                            success: true,
                            message: "Account is created successfully with email: " + email
                        });
                    }
                });
            }
        });

    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid request body.'
        });
    }
}

module.exports = register;