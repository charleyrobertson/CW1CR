//Import goals class
const { response } = require("express");
const db = require("../models/goalModel");


//Home
exports.home_page = function (req, res) {
  res.render("home", {
    user: req.user
  });
};
//End of Home

//View All Goals
exports.view_goals = function (req, res) {
  db.getAllGoals()
    .then((list) => {
      res.render("viewGoals", {
        title: "View All Training Goals",
        entries: list,
        user: req.user
      });
      console.log("Promise Resolved");
    })
    .catch((err) => {
      console.log("Promise Rejected", err);
    });
};
//End of View All Goals

//Add a goal
exports.new_goal = function (req, res) {
  res.render("addGoals", {
    title: 'Add a Goal',
    user: req.user
  });
};

exports.post_new_goal = function (req, res) {
  console.log("Adding a new goal to DB");
  db.addGoal(
    req.body.goal,
    req.body.startTime,
    req.body.endTime,
    req.body.startDate,
    req.user.name
  );
  res.redirect("/ViewTrainingGoals");
};
//End of Add a goal

//Update a goal
exports.update_goal = function (req, res) {
  let id = req.params._id;
  console.log("Updating goal page loading...");
  db.findUpdateGoal(id)
    .then((goal) => {
      res.render("updateGoal", {
        goal: goal,
        user: req.user
      });
    })
    .catch((err) => {
      console.log("Error handling update form", err);
    });
};

exports.post_update_goal = function (req, res) {
  console.log("Updating a goal...");
  db.updateGoal(
    req.params._id,
    req.body.goal,
    req.body.startTime,
    req.body.endTime,
    req.body.startDate
  );
  res.redirect("/ViewTrainingGoals");
};
//End of Update a goal

//Delete a goal
exports.delete_goal = function (req, res) {
  res.render("deleteGoal", {
    user: req.user
  });
};

exports.post_delete_goal = function (req, res) {
  console.log("Deleting a goal...");
  db.deleteGoal(req.params._id);
  res.redirect("/ViewTrainingGoals");
};
//End of Delete a goal
