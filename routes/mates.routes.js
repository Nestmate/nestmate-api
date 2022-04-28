
//FIND MATCHES IN INTEREST (GIVE SCORE OUT OF 100%)
//arr1.filter(element => arr2.includes(element));

const router = require("express").Router();
const User = require("../models/User.model");
const Mate = require("../models/Mate.model");
const Favourite = require("../models/Favourite.model");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const mates = await Mate.find({ user:userId },{ password: 0 }).populate('mate');

    res.status(200).json(mates);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const distance = 100;
        const {loc,_id,interests} = await User.findById(userId);

        const users = await User.find({
            loc: {
                $near: {
                    $geometry: { type: "Point",  coordinates: [ loc.coordinates[0], loc.coordinates[1] ] },
                    $maxDistance: parseInt( distance * 1000 )
                  }
            },
            _id: { $ne: _id }
        },{ password: 0 });

        const matches = users.filter(user => {
            const userInterests = user.interests;
            const match = interests.filter(interest => userInterests.includes(interest));
            return match;
        });

        console.log(matches);
        const mappedMatches = matches.map(match => {
            return {
                user: _id,
                mate: match._id,
                precentage: 0,
                interests: []  
            }
        });

        const mates = await Mate.insertMany(mappedMatches);

        res.status(200).json(mates);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
