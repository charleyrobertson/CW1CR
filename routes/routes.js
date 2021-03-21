const express = require("express");
const router = express.Router();

const controller = require("../controllers/goalController.js");

//Home page
router.get("/", controller.home_page);

//View all goals page
router.get("/ViewTrainingGoals", controller.view_goals);

//Add a goal page
router.get("/newGoal", controller.new_goal);
router.post("/newGoal", controller.post_new_goal);

//Update a goal
router.get("/updateGoal/:_id", controller.update_goal);
router.post("/updateGoal/:_id", controller.post_update_goal);

//Delete a goal
router.get("/deleteGoal/:_id", controller.delete_goal);
router.post("/deleteGoal/:_id", controller.post_delete_goal);

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
