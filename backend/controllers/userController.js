const { default: mongoose } = require('mongoose')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)
        console.log(user)

        res.status(200).json({ email, token, role: user.role })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get logged in user
const getLoggedInUser = async (req, res) => {
    const userId = req.user._id // userId is attached by the requireAuth middleware

    try {
        const user = await User.findById(userId).select('email role')

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json({ email: user.email, role: user.role })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('_id email role');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No user' })
    }

    const user = await User.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!user) {
        return res.status(404).json({ error: 'No user' })
    }

    res.status(200).json(user)
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No user' })
    }

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}


module.exports = { signupUser, loginUser, getLoggedInUser, getAllUsers, updateUser, deleteUser }