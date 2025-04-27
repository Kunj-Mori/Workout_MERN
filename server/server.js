// Import modules
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// Create Express app
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

// Database connection
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        console.log('Using cached database instance');
        return cachedDb;
    }
    
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        cachedDb = db;
        console.log('New database connection established');
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

// Connect to database before handling requests
app.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// Routes
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)

// Test route to verify server is running
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        status: "error",
        message: err.message || "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.stack : undefined
    })
})

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Route not found"
    });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

// Export the Express API
module.exports = app;
