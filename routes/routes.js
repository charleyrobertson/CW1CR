const express = require("express");
const auth = require('../auth/auth');
const {ensureLoggedIn} = require('connect-ensure-login');
const controller = require("../controllers/goalController.js");
const userController = require("../controllers/userController.js")

const router = express.Router();
//Home page
router.get("/", controller.home_page);

//View all goals page
router.get("/ViewTrainingGoals", controller.view_goals);

//Add a goal page
router.get("/newGoal", ensureLoggedIn('/login'), controller.new_goal);
router.post("/newGoal", controller.post_new_goal);

//Update a goal
router.get("/updateGoal/:_id", ensureLoggedIn('/login'), controller.update_goal);
router.post("/updateGoal/:_id", controller.post_update_goal);

//Delete a goal
router.get("/deleteGoal/:_id", ensureLoggedIn('/login'), controller.delete_goal);
router.post("/deleteGoal/:_id", controller.post_delete_goal);

//Login
router.get('/login', userController.login_user);
router.post('/login', auth.authorize('/login'), userController.post_login_user);

//Register
router.get('/register', userController.register_user);
router.post('/register', userController.post_register_user);

//Log out
router.get('/logout', userController.logout);

//Exceptions
router.use(function (req, res) {
  res.status(404);
  res.type("text/plain");
  res.send("404 Not Found");
});

router.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plain");
  res.send("Internal Server Error");
});

module.exports = router;
