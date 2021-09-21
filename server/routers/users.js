// hello world
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const databaseController = require('../controllers/databaseController');

// Route for getting all users
//not used in production version
router.get('/', databaseController.getAllUsers, (req, res) =>
  res.status(200).json(res.locals.users)
);

// Getting one user
//not used in production version
router.get('/:id', findUserById, databaseController.getUser, (req, res) =>
  res.status(200).json(res.locals.user)
);

// Creating user
router.post('/create', databaseController.createUser);

// Deleting one user
//not used in production version
router.delete('/:id', findUserById, databaseController.deleteUser, (req, res) =>
  res.status(200).json({ message: 'Deleted user' })
);

//authenticates user on local db
router.post('/login', databaseController.authenticateUser);

// Get user middleware
//not used in production version
async function findUserById(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user === null) {
      return res.status(404).json({ message: 'This user does not exist' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'This user does not exist' });
  }
  res.user = user;
  next();
}

module.exports = router;
