const router = require("express").Router();
const Mate = require("../models/Mate.model");
const Favourite = require("../models/Favourite.model");
const User = require("../models/User.model");
const isAuthUser = require("../helpers/isAuthUser");

router.get("/:userId", async (req, res) => {
    try{
        const { userId } = req.params;

        if(!userId) return res.status(400).json({ message: "User is required" });

        const {favourites} = await User.findOne({ _id: userId },'favourites').populate('favourites',{ password: 0 });

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
            await User.updateOne({ _id:authUser._id },{ $pull: { favourites: mateId } });
            return res.status(200).json({ message: false });
        }

        await User.updateOne({ _id:authUser._id },{ $push: { favourites: mateId } });
        return res.status(200).json({ message: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;