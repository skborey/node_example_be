const CollectionRepo = require('../db/collection.js');

const service = {

    getCollections: (req, res) => {

        CollectionRepo.find((err, data) => {

            if (err) return res.json({ success: false, error: err });

            return res.json({
                success: true,
                data: data
            });
        }).sort({_id: 1});
    }
}

module.exports = service;