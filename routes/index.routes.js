const router = require("express").Router();
const authRoutes = require("./auth.routes");
const auth = require("../middleware/auth");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/welcome",auth, (req, res, next) => {
  res.json("Welcome 👋");
});

router.use("/auth", authRoutes);

module.exports = router;
