const router = require("express").Router();
const User = require("../models/User.model");

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username },{ password: 0 });

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/location/:lng/:lat/:distance", async (req, res) => {
  try {
    const { lat, lng, distance } = req.params;

    if( !lat || !lng ) return res.status(400).json({ msg: "Latitude and longitude are required" });

    const users = await User.find({
        loc: {
            $near: {
                $geometry: { type: "Point",  coordinates: [ lng, lat ] },
                $maxDistance: parseInt( distance * 1000 )
              }
        }
    },{ password: 0 });

    res.status(200).json(users);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
