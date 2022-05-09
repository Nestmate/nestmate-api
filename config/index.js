// We reuse this import in order to have access to the `body` property in requests
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const favicon = require('serve-favicon');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const MONGO_URI = require("../utils/consts");

module.exports = (app) => {

  app.set("trust proxy", 1);

  app.use(cors());

  app.use(logger("dev"));
  app.use(favicon('./public/images/favicon.ico'));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb' , extended: true, parameterLimit: 1000000}));
  app.use(cookieParser());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "super hyper secret key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  app.use((req, res, next) => {
    req.user = req.session.user || null;
    next();
  });

  

};
