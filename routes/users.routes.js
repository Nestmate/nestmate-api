const router = require("express").Router();
const User = require("../models/User.model");
const isAuthUser = require("../helpers/isAuthUser");

router.get("/:username" , async (req, res) => {
  try {

    let authUser = await isAuthUser(req);
    
    const { username } = req.params;
    
    const user = await User.findOne({ username },{ password: 0 }).populate('interests');

    if (!user) return res.status(404).json({ msg: "User not found" });
    
    const favourites = authUser?._id ? await User.findOne({ _id: authUser?._id, favourites: user?._id }) : false;

    console.log('Has Favourites = >', favourites);
    
    let isFavourited = !favourites ? false : true;

    const updatedUser = { ...user._doc, isFavourited }

    res.status(200).json(updatedUser);

  } catch (err) {

    res.status(500).json({ message: err });
    
  }
});



router.post("/location/:lng/:lat/:distance",  async (req, res) => {
  try {
    const { lat, lng, distance } = req.params;
    const { user } = req.body;

    if( !lat || !lng ) return res.status(400).json({ msg: "Latitude and longitude are required" });

    const users = await User.find({
        loc: {
            $near: {
                $geometry: { type: "Point",  coordinates: [ lng, lat ] },
                $maxDistance: parseInt( distance * 1000 )
              }
        },
        _id: { $ne: user?._id }
    },{ password: 0 }).populate('interests');

    res.status(200).json(users);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
