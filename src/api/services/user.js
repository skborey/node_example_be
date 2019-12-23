const UserRepo = require('../db/user');
const ColllectionRepo = require('../db/collection');
const CollaborationRepo = require('../db/collaboration');
const RestaurantRepo = require('../db/restaurant');
const RestaurantRRepo = require('../db/restaurantRelation');

const service = {

    getUserAssets: (req, res) => {

        let response = {
            user: {},
            collections: {},
            relationC2C: [],
            relationC2R: [],
            collaborators: {},
            restaurants: {},
        };

        let email = req.decoded.email

        //User
        UserRepo.findOne( {'email': email} , (err0, user) => {
            if (err0) return res.json({ success: false, error: err0 });
            if (user) {
                response['user'] = { _id: user._id, email: user.email };

                // All collections
                ColllectionRepo.find({}, (err1, _collections) => {
                    if (err1) return res.json({ success: false, error: err1 });
                    _collections.forEach((d, i) => { response['collections'][d._id] = d; });

                    // All relationC2C
                    CollaborationRepo.find({}, (err2, _collaborations) => {
                        if (err2) return res.json({ success: false, error: err2 });
                        _collaborations.forEach((d, i) => {
                            response['relationC2C'].push([d.collection_id, d._id]);
                            // All collaborators
                            response['collaborators'][d._id] = d;
                        });

                        // All relationC2R
                        let _restaurantIds = []
                        RestaurantRRepo.find({}, (err3, _relationC2R) => {
                            if (err3) return res.json({ success: false, error: err3 });
                            _relationC2R.forEach((d, i) => {
                                response['relationC2R'].push([d.collection_id, d.restaurant_id]);
                                _restaurantIds.push(d.restaurant_id)
                            })

                            // restaurants in relation
                            console.log(_restaurantIds);
                            RestaurantRepo.find({ _id: {$in: _restaurantIds}}, (err4, _restaurants) => {
                                if (err4) return res.json({ success: false, error: err4 });
                                _restaurants.forEach((d, i) => { response['restaurants'][d._id] = d; });

                                // additional 10 restaurants
                                RestaurantRepo.find({}, (err5, _restaurants) => {
                                    if (err5) return res.json({ success: false, error: err5 });
                                    _restaurants.forEach((d, i) => { response['restaurants'][d._id] = d; });

                                    return res.json({ /// OH MY GOD \\\\\ 
                                        success: true,
                                        data: response,
                                    });
                                }).limit(10);
                            });
                        });
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