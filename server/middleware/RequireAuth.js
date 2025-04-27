const User = require("../models/User")
const jwt = require("jsonwebtoken")

async function RequireAuth(req, res, next) {
    // Verify authentication
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({ error: "Authorization token required" })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select("_id")
        next()
    } catch(error) {
        console.log(error)

        res.status(401).json({ error: "Request is not authorized" })
    }
}

module.exports = RequireAuth