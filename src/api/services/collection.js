const CollectionRepo = require('../db/collection.js');
const RestaurantRepo = require('../db/restaurant.js');
const CollaborationRepo = require('../db/collaboration.js');

const service = {

    getCollections: (req, res) => {

        let email = req.decoded.email;

        CollectionRepo.find({owner_email: email}, (err, data) => {

            if (err) return res.json({ success: false, error: err });

            let collections = {};
            let restaurantIds = [];
            let collaborationIds = [];
            data.forEach((d, i) => {
                collections[d['_id']] = d;
                restaurantIds = [...new Set([...restaurantIds, ...d.restaurants])]; // this approach will remove the duplicate elements
                collaborationIds = [...new Set([...collaborationIds, ...d.collaborations])];
            });

            /**
             * Get all restaurants in collection
             */
            RestaurantRepo.find(({ _id: { $in: restaurantIds}}), (err, result) => {
                
                if (err) return res.json({ success: false, message: "Internal Sever Error." });

                let restaurants = {};
                result.forEach((d, i) => { restaurants[d['_id']] = d; });

                /**
                 * Get all collaborations in collection
                 */
                CollaborationRepo.find(({ _id: { $in: collaborationIds}}), (err, result) => {

                    if (err) return res.json({ success: false, message: "Internal Sever Error." });

                    let collaborations = {};
                    result.forEach((d, i) => { collaborations[d['_id']] = d; });

                    let data = {
                        collections: collections,
                        restaurants: restaurants,
                        collaborations: collaborations
                    }

                    return res.json({
                        success: true,
                        data: data
                    });
                });
            });
        }).sort({_id: 1});
    }
}

module.exports = service;