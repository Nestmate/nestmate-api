const router = require("express").Router();
const isAuthUser = require("../helpers/isAuthUser");
const Connection = require("../models/Connection.model");

router.get("/", async (req, res) => {

    try {

        const authUser = await isAuthUser(req);

        if( !isAuthUser ) return res.status(400).json({ message: "User is required" });

        const connections = await Connection.find({ users: authUser._id }).populate('users',{ password: 0 });

        console.log(connections);

        const filteredConnections = connections.map( connection  => { return { user: connection.users.find( ( { _id } ) => _id != authUser._id) }});

        res.status(200).json(filteredConnections);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }

});

router.get("/:id", async (req, res) => {

    try {

        const authUser = await isAuthUser(req);
        const { id } = req.params;

        if( !authUser ) return res.status(400).json({ message: "User is required" });

        const connection = await Connection.findOne({ _id:id }).populate({
            path: 'users',
            populate: {
                path: 'interests'
            }
        });
        console.log(connection);

        // console.log(connections);

        const filteredUser = connection.users.find( ( { _id } ) => _id != authUser._id);
        delete connection.users;
        res.status(200).json({ ...connection._doc, user: filteredUser });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }

});


module.exports = router;