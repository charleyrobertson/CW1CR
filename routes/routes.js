const express = require("express");
const auth = require('../auth/auth');
const {ensureLoggedIn} = require('connect-ensure-login');
const controller = require("../controllers/goalController.js");
const userController = require("../controllers/userController.js")

const router = express.Router();

//Home page
router.get("/", controller.home_page);

//View Goal Options page
router.get("/goal-options", controller.goal_options);

//View weekly goals page
router.get("/view-weekly-goals", ensureLoggedIn('/login'), controller.view_weekly_goals);

//View past goals page
router.get("/view-past-goals", ensureLoggedIn('/login'), controller.view_past_goals);

//View future goals page
router.get("/view-future-goals", ensureLoggedIn('/login'), controller.view_future_goals);

//Add a goal page
router.get("/add-goal", ensureLoggedIn('/login'), controller.new_goal);
router.post("/add-goal", controller.post_new_goal);

//Update a goal
router.get("/update-goal/:_id", ensureLoggedIn('/login'), controller.update_goal);
router.post("/update-goal/:_id", controller.post_update_goal);

//Delete a goal
router.get("/delete-goal/:_id", ensureLoggedIn('/login'), controller.delete_goal);
router.post("/delete-goal/:_id", controller.post_delete_goal);

//Complete Goal
router.post("/view-weekly-goals", controller.post_complete_goal);

//Sharable URL
router.get('/share-link/:username', controller.share_link);
router.get('/share-link/:username/:date', controller.share_link_guest);

//User Details
router.get("/user-details", ensureLoggedIn('/login'), userController.user_details);

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
