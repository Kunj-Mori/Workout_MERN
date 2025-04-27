const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// Get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user_id: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    try {
        const workout = await Workout.create({ 
            title, 
            load, 
            reps,
            user_id: req.user._id 
        });
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const workout = await Workout.findOneAndDelete({ _id: id, user_id: req.user._id });
        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const workout = await Workout.findOneAndUpdate(
            { _id: id, user_id: req.user._id },
            { ...req.body },
            { new: true }
        );
        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}; 