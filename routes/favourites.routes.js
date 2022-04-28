const router = require("express").Router();
const Mate = require("../models/Mate.model");
const Favourite = require("../models/Favourite.model");
const User = require("../models/User.model");

router.get("/:userId", async (req, res) => {
    try{
        const { userId } = req.params;

        if(!userId) return res.status(400).json({ message: "User is required" });

        const favourites = await Favourite.find({ user: userId }).populate('mate',{ password: 0 });

        res.status(200).json(favourites);

    }catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

router.post("/:mateId", async (req, res) => {
    try {
        const { mateId } = req.params;
        const { user } = req.body;
        console.log(user);
        
        let favourite = await Favourite.findOne({user:user._id, mate:mateId });
        
        if(favourite){
            await Favourite.deleteOne({ _id:favourite });
            await User.updateOne({ _id:user._id },{ $pull: { favourites: favourite._id } });
            return res.status(200).json({ message: false });
        }

        favourite = await Favourite.create({ user:user._id, mate:mateId })
        console.log(favourite);
        await User.updateOne({ _id:user._id },{ $push: { favourites: favourite._id } });
        return res.status(200).json({ message: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;