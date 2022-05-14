
//FIND MATCHES IN INTEREST (GIVE SCORE OUT OF 100%)
//arr1.filter(element => arr2.includes(element));

const router = require("express").Router();
const User = require("../models/User.model");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const { connections } = await User.findOne({ _id:userId },'connections').populate({
        path : 'connections',
        populate : {
            path : 'interests'
        }
    });

    res.status(200).json( connections );

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
            return interests.filter(interest => userInterests.includes(interest));
        });

        const mappedMatches = matches.map( match => match._id );

        const { connections } = await User.findOneAndUpdate({ _id },{ connections: mappedMatches }, { new: true }).populate({
            path : 'connections',
            populate : {
                path : 'interests'
            }
        });

        console.log(connections);

        res.status(200).json( connections );

    } catch (err) {

        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
