require("dotenv/config");
require("./db");

const express = require("express");
const socketIO = require("socket.io");
const http = require('http')

const app = express();

const server = http.createServer(app)
const io = socketIO(server, {
  path: '/notification/'
});
require('./controllers/notification')(io)

require("./config")(app);

app.use("/api/", require("./routes/routes"));

require("./error-handling")(app);

module.exports = app;
