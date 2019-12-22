const UserRepo = require('../db/user');
const ColllectionRepo = require('../db/collection');
const CollaborationRepo = require('../db/collaboration');

const service = {

    getUserAssets: (req, res) => {

        let response = {};

        let email = req.decoded.email

        UserRepo.findOne( {'email': email} , (err, user) => {

            if (err) return res.json({ success: false, error: err });

            if (user) {
                //User
                response['user'] = { _id: user._id, email: user.email };

                ColllectionRepo.find({ owner_email: user.email }, (err1, _collections) => {
                    if (err1) return res.json({ success: false, error: err1 });

                    let collections = {};
                    _collections.forEach((d, i) => {
                        collections[d['_id']] = d;
                    });
                    
                    //Collection - owner
                    response['collections'] = collections;

                    return res.json({
                        success: true,
                        data: response,
                    });
                });
            } else {
                return res.json({
                success: false,
                message: 'Not found'
            });
            }
        });
    },

    getUser: (req, res) => {
        let email = req.decoded.email

        UserRepo.findOne( {'email': email} , (err, data) => {
            if (err) return res.json({ success: false, error: err });

            if (data) {
                return res.json({
                    success: true,
                    email: data.email
                });
            } else {
                return res.json({
                success: false,
                message: 'Not found'
            });
            }
        });
    }
}

module.exports = service;