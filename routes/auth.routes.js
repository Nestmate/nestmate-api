const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const regex = require("../helpers/regex");

router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

router.post("/signup", isLoggedOut, async (req, res) => {

  try {

    const { firstName, lastName, email, password } = req.body;
    
    if (!(email && password && firstName && lastName)) throw new Error("All input is required", { statusCode: 400 });
    const lowerCaseEmail = email.toLowerCase();
    if(!regex.validateEmail(lowerCaseEmail))  throw new Error("Email is not valid", { statusCode: 409 });

    const oldUser = await User.exists({ email: lowerCaseEmail });

    if (oldUser) return res.status(400).json({ error: 'user_exists', message: 'User exists' });

    if(!regex.validatePassword(password))  throw new Error("Invalid password", { statusCode: 409 });

    encryptedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      firstName,
      lastName,
      email: lowerCaseEmail,
      password: encryptedPassword
    });

    const token = await jwt.sign(
      { user_id: user._id, lowerCaseEmail },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    //send refresh token;

    return res.status(201).json(user);

  }catch (error) {

    console.log(error);
    if (error instanceof mongoose.Error.ValidationError) return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000) return res.status(400).json({errorMessage:"Username need to be unique. The username you chose is already in use."});
    
    return res.status(error.statusCode || 400 ).json({ errorMessage: error.message || error });

  }

});

router.post("/signin", isLoggedOut, async (req, res, next) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) throw new Error("All input is required", { statusCode: 400 });
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      
      console.log(token);
      // save user token
      user.token = token;

      res.status(200).json(user);
    }
    throw new Error("Invalid Credentials", { statusCode: 400 });

  } catch (error) {
    return res.status(error.statusCode || 400 ).json({ errorMessage: error.message || error });
  }

});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.json({ message: "Done" });
  });
});

module.exports = router;
