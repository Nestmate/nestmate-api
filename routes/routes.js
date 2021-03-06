module.exports = (io) => {
  const router = require("express").Router();

  router.get("/", (req, res, next) => {
    res.json("All good in here");
  });

  router.use("/auth", require("./auth.routes"));
  router.use("/users", require("./users.routes"));
  router.use("/locations", require("./locations.routes"));
  router.use("/mates", require("./mates.routes"));
  router.use("/files", require("./files.routes"));
  router.use("/notifications", require("./notifications.routes"));
  router.use("/favourites", require("./favourites.routes")(io));
  router.use("/interests", require("./interests.routes"));
  router.use("/settings", require("./settings.routes"));
  router.use("/onboarding", require("./onboarding.routes"));
  router.use("/connections", require("./connections.routes"));
  router.use("/chats", require("./chat.routes")(io));

  return router;

}

