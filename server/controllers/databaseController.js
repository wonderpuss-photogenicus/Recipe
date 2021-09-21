const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');
const databaseController = {};

// Route for getting all users
//not really used in the production version of the app
databaseController.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.locals.users = users;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Getting one user
//also not used  in production version
databaseController.getUser = (req, res, next) => {
  next();
};

// Creating user
// uses bcypt to create a new password for new user and saves in local mongoDB
databaseController.createUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.send('Send to their page'); //frontend expects this message to validate user has been created
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Deleting one user
//not used in production version
databaseController.deleteUser = async (req, res, next) => {
  try {
    await res.user.remove();
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//verifies user info is correct before rendering app
databaseController.authenticateUser = async (req, res, next) => {
  console.log(req.body);
  const user = await User.findOne({ username: req.body.username });
  console.log(user);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Send to their page');
    } else {
      res.send('The username or password is incorrect');
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

module.exports = databaseController;
