const Workouts = require("../models/Workouts")
const mongoose = require("mongoose")

class WorkoutsController {
    // get all workouts
    async index(req, res) {
        const user_id = req.user._id
        const workouts = await Workouts.find({ user_id }).sort({ createdAt: -1 })

        res.status(200).json(workouts)
    }
    
    // get a single workout
    async show(req, res) {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such workout"})
        }

        const workout = await Workouts.findById(id)

        if(!workout) {
            return res.status(404).json({error: "No such workout"})
        }

        res.status(200).json(workout)
    }
    
    // create a new workout
    async store(req, res) {
        const { title, load, reps } = req.body
        let emptyField = []

        if(!title) {
            emptyField.push("title")
        }
        if(!load) {
            emptyField.push("load")
        }
        if(!reps) {
            emptyField.push("reps")
        }
        if(emptyField.length > 0) {
            return res.status(400).json({ error: "Please fill in all the fields", emptyField })
        }
    
        // Add document to database
        try {
            const user_id = req.user._id
            const workout = await Workouts.create({title, load, reps, user_id})
            res.status(200).json(workout)
        } catch(error) {
            res.status(400).json({error: error.message})
        }
    }

    // delete a workout
    async destroy(req, res) {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such workout"})
        }

        const workout = await Workouts.findOneAndDelete({_id: id})
        
        if(!workout) {
            return res.status(404).json({error: "No such workout"})
        }

        res.status(200).json(workout)
    }
    
    // update a workout
    async update(req, res) {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such workout"})
        }

        const workout = await Workouts.findOneAndUpdate({_id: id}, {
            ...req.body
        })

        if(!workout) {
            return res.status(404).json({error: "No such workout"})
        }

        res.status(200).json(workout)
    }
}

module.exports = new WorkoutsController()