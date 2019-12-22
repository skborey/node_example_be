const UserRepo = require('../db/user');
const ColllectionRepo = require('../db/collection');
const CollaborationRepo = require('../db/collaboration');
const RestaurantRepo = require('../db/restaurant');
const RestaurantRRepo = require('../db/restaurantRelation');

const service = {

    getUserAssets: (req, res) => {

        let response = {};

        let email = req.decoded.email

        //User
        UserRepo.findOne( {'email': email} , (err, user) => {
            if (err) return res.json({ success: false, error: err });

            if (user) {

                response['user'] = { _id: user._id, email: user.email };
                
                // Find Collection - of owner
                ColllectionRepo.find({ owner_email: user.email }, (err1, _collections) => { if (err1) return res.json({ success: false, error: err1 });
                    let collections = {}
                    _collections.forEach((d, i) => { collections[d['_id']] = d; });
                    response['collections'] = collections;

                    // Find Collaboration relation - relationC2C
                    CollaborationRepo.find({email: email}, (err2, _relationC2C) => { if (err2) return res.json({ success: false, error: err2 });
                        response['relationC2C'] = _relationC2C.map((d, i) => [d.collection_id, user._id]);

                        // Find collection - as collaborator
                        let ids = _relationC2C.map((d, i) => d.collection_id);
                        ColllectionRepo.find({ _id: {$in: ids}}, (err3, _notOwnerCollections) => { if (err3) return res.json({ success: false, error: err3 });
                            _notOwnerCollections.forEach((d, i) => {
                                response['collections'] = {...response['collections'], [d['_id']]: d }
                            });

                            // relationC2R, get all collection id relate to user
                            ids = Object.keys(response['collections']).map((id) => id)
                            RestaurantRRepo.find({ collection_id: {$in: ids}}, (err4, _relationC2R) => { if (err4) return res.json({ success: false, error: err4 });
                                response['relationC2R'] = _relationC2R.map((d, i) => [d.collection_id, d.restaurant_id]);

                                // Find Restaurant base on relation with collection
                                ids = _relationC2R.map((d, i) => d.restaurant_id);
                                RestaurantRepo.find({ _id: {$in: ids}}, (err5, _retaurants) => { if (err5) return res.json({ success: false, error: err5 });
                                    let retaurants = {};
                                    _retaurants.forEach((d, i) => { retaurants[d['_id']] = d; });
                                    response['retaurants'] = retaurants;

                                    return res.json({ /// OH MY GOD \\\\\ 
                                        success: true,
                                        data: response,
                                    });
                                });
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