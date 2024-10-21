const express = require('express')

// controller functions
const { signupUser, loginUser, getLoggedInUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController')
const requireJWT = require('../middleware/requireJWT')
const requireAdmin = require('../middleware/requireAdmin')


const router = express.Router()

// login route
router.post('/login', loginUser)


// signup route
router.post('/signup', signupUser)

// get logged in user
router.get('/currentuser', requireJWT, getLoggedInUser)

// get all users
router.get('/allusers', requireAdmin, requireJWT, getAllUsers)

// patch user
router.patch('/update/:id', requireAdmin, requireJWT, updateUser);

// delete user
router.delete('/delete/:id', requireAdmin, requireJWT, deleteUser);



module.exports = router