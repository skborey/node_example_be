const CollectionRepo = require('../db/collection.js');
const RestaurantRepo = require('../db/restaurant');
const CollaborationRepo = require('../db/collaboration');
const UserRepo = require('../db/user');
const RestaurantRRepo = require('../db/restaurantRelation');

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

            // declear here cannot insert all fields
            // let newCollection = { // field name must be stirng otherwise cannot insert except field of empty array
            //     "name": name,
            //     "owner_email": owner_email,
            //     "restaurants": [],
            //     "collaborations": []
            // }

            CollectionRepo.insertMany({ "name": name, "owner_email": owner_email, }, (err, data) => {

                if (err) return res.status(500).json({ success: false, message: "Internal Sever Error." });

                return res.json({
                    success: true,
                    collection: data[0],
                    message: "New collection added successfully."
                });
            });
        } else {
            return res.status.json({
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

        let id = req.params.id;

        if (id) {

            // remove from collaboration first
            CollaborationRepo.deleteMany({collection_id: id}, (err, r) => {
                if (err) return res.status(500).json({ success: false, message: "Internal Sever Error." });
                console.log('number of deleted ', r.deletedCount);
                
                // remove from relation
                RestaurantRRepo.deleteMany({collection_id: id}, (err2, r2) => {
                    if (err2) return res.status(500).json({ success: false, message: "Internal Sever Error." });
                    console.log('number of deleted ', r2.deletedCount);
                    
                    CollectionRepo.deleteOne({_id:id}, (err, data) => {
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
                });
            });
        } else {
            return res.status.json({
                success: false,
                message: "Invalid Id"
            });
        }
    },

    addRestaurant: (req, res) => {

        let collectionId = req.body.collection_id;
        let restaurantId = req.body.restaurant_id;

        if (restaurantId && collectionId) {

            //@TODO add should check restaurant and collection is exist first before add.

            RestaurantRRepo.findOne({
                $and: [{restaurant_id: restaurantId}, {collection_id: collectionId}]
            }, (error, isExist) => {
                if (error) return res.status(500).json({ success: false, message: "Internal Sever Error." });

                if (isExist) {
                    return res.json({
                        success: false,
                        message: "This restaurant already added."
                    });
                }

                RestaurantRRepo.insertMany({
                    restaurant_id: restaurantId,
                    collection_id: collectionId
                }, (err, re) => {

                    if (err) return res.status(500).json({ success: false, message: "Internal Sever Error." });

                    return res.json({
                        success: true,
                        message: "Added successfully."
                    });
                });
            });
        } else {
            return res.json({
                success: false,
                message: "Invalid request"
            });
        }
    },

    removeRestaurant: (req, res) => {

        let collectionId = req.body.collection_id;
        let restaurantId = req.body.restaurant_id
    
        if (collectionId && restaurantId) {
            RestaurantRRepo.deleteMany({$and: [{collection_id: collectionId, restaurant_id: restaurantId}]}, (err, r) => {
                if (err) return res.status(500).json({ success: false, message: "Internal Sever Error.", error: err });
                console.log('number of deleted ', r.deletedCount);

                return res.json({
                    success: true,
                    message: "The restaurant is remove successfully."
                });
            });
        } else {
            return res.json({
                success: false,
                message: "Invalid request"
            });
        }
    }
}

module.exports = service;