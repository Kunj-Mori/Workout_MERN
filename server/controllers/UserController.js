const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" })
}

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token, userId: user._id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Signup user
const signupUser = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const user = await User.signup(email, password, username)
        const token = createToken(user._id)
        res.status(200).json({ email, token, userId: user._id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser
}
