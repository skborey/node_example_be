const CollaborationRepo = require('../db/collaboration');

const service = {

    addNewCollaboration: (req, res) => {
        let name = req.body.name;
        let email = req.body.email;

        if (name && email) {
            CollaborationRepo.insertMany({"name": name, "email": email}, (err, data) => {

                if (err) return res.status(500).json({ success: false, message: "Internal Sever Error." });
                else {
                    return res.json({
                        success: true,
                        id: data[0]['_id'],
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
    }
}

module.exports = service;