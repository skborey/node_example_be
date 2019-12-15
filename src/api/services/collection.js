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
    },

    deleteCollectionById: (req, res) => {
        console.log(req.params.id);
        if (req.params.id) {
            CollectionRepo.deleteOne({_id: req.params.id}, (err, data) => {
                if (err) return res.status(500).json({ success: false, message: "Internal Sever Error." });
                else {
                    if (data.deletedCount == 0)
                        return res.json({
                            success: true,
                            message: "Collection is not exist."
                        });
                    else return res.json({
                        success: true,
                        message: "Collection is removed successfully."
                    });
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            });
        }
    }
}

module.exports = service;