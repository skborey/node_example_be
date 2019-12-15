const InvalidTokenRepo = require('../db/invalidToken.js');

/**
 * Verify Token before add JWT to invalidDB.
 * User MUST login first before they could logout
 */
let logout = (req, res) => {
    console.log(req.token);
    InvalidTokenRepo.insertMany({token: req.token}, (err, r) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal server error.'});
        } else {
            return res.json({ success: true, message: 'Logout successfully.'});
        }
    });
}

module.exports = logout;
