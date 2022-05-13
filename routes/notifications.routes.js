const router = require("express").Router();
const Notification = require("../models/Notification.model");
const isAuthUser = require("../helpers/isAuthUser");

router.post("/", async (req, res) => {
    try {
        const { range } = req.body;
        console.log(range);
        const user = await isAuthUser(req);
        console.log(user);
        if (!user) return res.status(401).json({ msg: "Unauthorized" });
        const notifications = await Notification.find({ user: user._id }).skip(range.skip).limit(range.limit).sort({ createdAt: -1 });

        res.status(200).json(notifications);

    } catch (err) {

        console.log(err);

        res.status(500).json({ message: err });
    }
});

module.exports = router;