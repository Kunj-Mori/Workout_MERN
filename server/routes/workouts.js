const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');

// Require auth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);

module.exports = router; 