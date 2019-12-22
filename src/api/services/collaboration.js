const CollaborationRepo = require('../db/collaboration');

const service = {

    addNewCollaboration: (req, res) => {

        let collectionId = req.body.collection_id
        let name = req.body.name;
        let email = req.body.email;

        if (name && email) {
            CollaborationRepo.insertMany({
                "name": name, 
                "email": email, 
                "collection_id": collectionId
            }, (err, data) => {

                if (err) return res.status(500).json({ success: false, message: "Internal Sever Error." });
                else {
                    let collaborators = {};
                    let relationC2C = [];
                    let c = data[0];

                    return res.json({
                        success: true,
                        collaborator: { _id: c._id, name: c.name, email: c.email},
                        relationC2C: [collectionId, c._id],
                        message: "Add new collaboration successfully. Next request add to collection.",
                    });
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid Request"
            });
        }
    },

    renameCollaboration: (req, res) => {

        let newName = req.body.new_name;
        let id = req.body.id;

        if (newName && id) {
            CollaborationRepo.updateOne({_id: id}, {"name": newName,}, (err, data) => {

                if (err) return res.status(500).json({ success: false, message: "Internal Sever Error." });
                else {
                    return res.json({
                        success: true,
                        message: "Rename successfully.",
                    });
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid Request"
            });
        }
    },
}

module.exports = service;