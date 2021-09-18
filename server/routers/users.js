const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

// Getting all users
router.get('/', async (req, res) => {
  try{
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting one user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

// Creating user
router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting one user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted user' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get user middleware
async function getUser(req, res, next) {
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