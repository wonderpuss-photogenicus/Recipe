
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');
const databaseController = {};

// Route for getting all users
databaseController.getAllUsers = async (req, res, next) => {
  try {

    const users = await User.find();
    res.locals.users = users;
    // res.json(users);
    next();

  }  catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// Getting one user
databaseController.getUser = (req, res, next) => {
  // res.json(res.user)
  next();

};


// Creating user
databaseController.createUser = async (req, res, next) => {
  try {


    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(req.body.password);
    const user = new User({

      username: req.body.username,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.status(201).json(newUser); // send .send() blank response
    // next();
  } catch (err) {
    console.log(req.body);
    res.status(400).json({ message: err.message });
  }
}


// Deleting one user
databaseController.deleteUser = async (req, res, next) => {
  try {
    await res.user.remove();
    // res.json({ message: 'Deleted user' })
    next();
  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};


// AUTHENTICATE USER * STRETCH * NOT 100% WORKING
databaseController.authenticateUser = async (req, res, next) => {
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
  } catch {
    res.status(500).send();
  }
};


module.exports = databaseController;

