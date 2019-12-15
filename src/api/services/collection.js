const CollectionRepo = require('../db/collection');
const RestaurantRepo = require('../db/restaurant');
const CollaborationRepo = require('../db/collaboration');

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

    addNewCollection: (req, res) => {

        let name = req.body.name;
        let owner_email = req.decoded.email;
        if (name && owner_email) {
            const newCollection = { // field name must be stirng otherwise cannot insert except field of empty array
                "name": name,
                "owner_email": owner_email,
                "restaurants": [],
                "collaborations": []
            }

            CollectionRepo.insertMany({newCollection}, (err, re) => {

                if (err) return res.status(500).json({ success: false, message: "Internal Sever Error." });

                return res.json({
                    success: true,
                    message: "New collection added successfully."
                });
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            });
        }
    },

    renameCollection: (req, res) => {

        let id = req.body.id;
        let newName = req.body.new_name;
        
        if (id && newName) {

            CollectionRepo.updateOne({_id: id}, {name: newName}, (err, re) => {

                if (err) return res.status(500).json({ success: false, message: "Internal Sever Error." });

                return res.json({
                    success: true,
                    message: "Collection rename successfully."
                });
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            });
        }
    },

    deleteCollectionById: (req, res) => {

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
    },

    addRelation: (req, res) => {

        let collectionId = req.body.collection_id;
        let collaborationId = req.body.collaboration_id;
        let restaurantId = req.body.restaurant_id
    
        if (collectionId) {

            let condition = {}

            if (collaborationId) condition["collaborations"] = collaborationId;
            if (restaurantId) condition["restaurants"] = restaurantId;

            CollectionRepo.updateOne({_id: collectionId}, {$addToSet: condition}, (err, re) => {

                if (err) return res.status(500).json({ success: false, message: "Internal Sever Error." });

                return res.json({
                    success: true,
                    message: "Added successfully."
                });
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            });
        }
    },

    removeRelation: (req, res) => {

        let collectionId = req.body.collection_id;
        let collaborationId = req.body.collaboration_id;
        let restaurantId = req.body.restaurant_id
    
        if (collectionId) {

            let condition = {}

            if (collaborationId) condition["collaborations"] = collaborationId;
            if (restaurantId) condition["restaurants"] = restaurantId;

            CollectionRepo.updateOne({_id: collectionId}, {$pull: condition}, (err, re) => {

                if (err) return res.status(500).json({ success: false, message: "Internal Sever Error." });

                return res.json({
                    success: true,
                    message: "Removed successfully."
                });
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            });
        }
    }
}

module.exports = service;