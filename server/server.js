// Import modules
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// Environment variables
const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/workout_db"

const app = express()

// Middleware
app.use(cors({
    origin: ['https://workout-crud-mern.vercel.app', 'http://localhost:3000'],
    credentials: true
  }));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
})

// Routes
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)

// Test route to verify server is running
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" })
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

// Export the Express API
module.exports = app;
