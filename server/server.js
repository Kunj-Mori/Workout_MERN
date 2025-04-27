// Import modules
const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/api")
const cors = require("cors")
require("dotenv").config()

// Environment variables
const PORT = 4000  // Explicitly set to 4000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/workout_db"

const app = express()

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
})

// Routes
app.use("/api", router)

// Test route to verify server is running
app.get("/", (req, res) => {
    res.json({ message: "Server is running!" })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        status: "error",
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
    })
})

// Database connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB successfully")
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
})
.catch((error) => {
    console.error("MongoDB connection error:", error)
    process.exit(1)
})
