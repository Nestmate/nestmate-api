module.exports = ( io ) => {

    const router = require("express").Router();
    const Connection = require("../models/Connection.model");
    const Notification = require("../models/Notification.model");
    const User = require("../models/User.model");
    const isAuthUser = require("../helpers/isAuthUser");
    const { ObjectId } = require('mongodb');

    router.get("/:userId", async (req, res) => {
        try{
            const { userId } = req.params;

            if(!userId) return res.status(400).json({ message: "User is required" });

            const { favourites } = await User.findOne({ _id: userId },'favourites').populate({
                path : 'favourites',
                populate : {
                    path : 'interests'
                }
            });

            console.log(favourites);

            res.status(200).json(favourites);

        }catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    });

    router.post("/:mateId", async (req, res) => {
        try {
            const { mateId } = req.params;
            const authUser = await isAuthUser(req);

            if(authUser.length === 0) return res.status(400).json({ message: "User is required" });
            
            let favourite = await User.exists({_id:authUser._id, favourites: mateId });
            
            if(favourite){
                await User.updateOne({ _id:authUser._id },{ $pull: { favourites: mateId } }, { new: true });
                return res.status(200).json({ message: false });
            }

            await User.updateOne({ _id:authUser._id },{ $push: { favourites: mateId } }, { new: true });


            let isAlreadyConnected = await Connection.exists({ users: { $all: [authUser._id, mateId] } });
            
            if(!isAlreadyConnected){

                let isConnected = await User.exists({_id:mateId, favourites: authUser._id });

                if(isConnected) {

                    const connection = await Connection.create({ users: [authUser._id, mateId] });

                    connection.users.forEach( async ({ _id }) => {

                        const notification = await Notification.create({
                            type: "connection",
                            user: _id.toString(),
                            title: "You've got a new connection!",
                            message: 'Quick check out your new connection',
                            link: `/connection/${connection._id}`});

                        io.to( _id.toString() ).emit('notification', { notification });
                    });
                }
                    

            }

            

            return res.status(200).json({ message: true });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    });

 return router;

}