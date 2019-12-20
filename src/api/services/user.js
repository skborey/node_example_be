const UserRepo = require('../db/user');

const service = {

    getUser: (req, res) => {
        var email = req.decoded.email

        UserRepo.findOne( {'email': email} , (err, data) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({
                success: true,
                email: data.email
            });
        });
    }
}

module.exports = service;