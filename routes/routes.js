const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));
router.use("/users", require("./users.routes"));
router.use("/locations", require("./locations.routes"));
router.use("/mates", require("./mates.routes"));

module.exports = router;
