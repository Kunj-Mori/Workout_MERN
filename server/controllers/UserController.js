const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    try {
        return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" })
    } catch (error) {
        console.error('Token creation error:', error)
        throw new Error('Error creating authentication token')
    }
}

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // Input validation
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields must be filled' })
        }

        const user = await User.login(email, password)
        const token = createToken(user._id)

        // Send response
        res.status(200).json({
            email,
            token,
            userId: user._id,
            username: user.username
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(400).json({ error: error.message })
    }
}

// Signup user
const signupUser = async (req, res) => {
    const { email, password, username } = req.body

    try {
        // Input validation
        if (!email || !password || !username) {
            return res.status(400).json({ error: 'All fields must be filled' })
        }

        // Create user
        const user = await User.signup(email, password, username)
        const token = createToken(user._id)

        // Send response
        res.status(201).json({
            email,
            token,
            userId: user._id,
            username: user.username
        })
    } catch (error) {
        console.error('Signup error:', error)
        
        // Handle specific error cases
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already in use' })
        }
        
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser
}
