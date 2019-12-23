const RestaurantRepo = require('../db/restaurant');

const service = {

    getRestaurants: (req, res) => {

        var params = req.query;

        var condition = {};
        if (params.name) condition.name = params.name;
        if (params.startAfter) condition._id = { $gt: ObjectId(params.startAfter) }
        if (params.endBefore) condition._id = { $lt: ObjectId(params.endBefore) }

        RestaurantRepo.find( condition, (err, data) => {
            
            if (err) return res.json({ success: false, error: err });

            let restaurants = {};
            data.forEach((d, i) => {
                restaurants[d['_id']] = d;
            });

            return res.json({
                success: true,
                restaurants: restaurants
            });
        }).limit(20).sort({_id: 1});
    }
}

module.exports = service;