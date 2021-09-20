
const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const databaseController = require('../controllers/databaseController')

// Route for getting all users
router.get('/',
  databaseController.getAllUsers,
  (req, res) => res.status(200).json(res.locals.users)
);

// Getting one user
router.get('/:id',
  findUserById,
  databaseController.getUser,
  (req, res) => res.status(200).json(res.user)
)

// Creating user
router.post('/', 
  databaseController.createUser,
  (req, res) => res.status(200).json(res.newUser)
)

// Deleting one user
router.delete('/:id', 
  findUserById,
  databaseController.deleteUser,
  (req, res) => res.status(200).json({ message: 'Deleted user' })
  )

// AUTHENTICATE USER * STRETCH * NOT 100% WORKING
// router.post('/users/login', 

//   databaseController.authenticateUser,
//   (req, res) => res.status(200).json(message)
// )

// Get user middleware
async function findUserById(req, res, next) {

  let user
  try {
    user = await User.findById(req.params.id)
    if (user === null) {
      return res.status(404).json({ message: 'This user does not exist'})
    }
  } catch (err) {
    return res.status(500).json({ message: 'This user does not exist' })
  }
  res.user = user
  next();
}

module.exports = router

