const express = require("express")
const WorkoutsController = require("../controllers/WorkoutsController")
const UserController = require("../controllers/UserController")
const RequireAuth = require("../middleware/RequireAuth")

const router = express.Router()

// Workout routes (require authentication)
router
    .route("/workouts")
    .get(RequireAuth, WorkoutsController.index)
    .post(RequireAuth, WorkoutsController.store)

router
    .route("/workouts/:id")
    .get(RequireAuth, WorkoutsController.show)
    .delete(RequireAuth, WorkoutsController.destroy)
    .patch(RequireAuth, WorkoutsController.update)

// Login and sign up routes (no authentication required)
router.post("/user/login", UserController.login)
router.post("/user/signup", UserController.signup)

module.exports = router