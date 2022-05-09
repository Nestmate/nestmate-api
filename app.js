require("dotenv/config");
require("./db");

const express = require("express");

const app = express();
const io = require("socket.io")();
app.io = io;

require("./config")(app);

app.use("/api/", require("./routes/routes")(io));

require("./error-handling")(app);

module.exports = app;
