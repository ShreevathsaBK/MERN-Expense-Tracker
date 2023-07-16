const express = require('express')

const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

// sign up
router.post('/signup', signupUser)

// sign in
router.post('/login', loginUser)

module.exports = router
