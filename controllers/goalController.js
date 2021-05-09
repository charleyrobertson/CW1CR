//Import goals class
const { response } = require("express");
const db = require("../models/goalModel");
const dateFunctionality = require("../public/js/dateFunctionality");
const dateFunc = new dateFunctionality();

//Home
exports.home_page = function (req, res) {
  res.render("home", {
    user: req.user
  });
  
};
//End of Home

//Goal Options
exports.goal_options = function(req, res) {
  res.render("goalOptions", {
    user: req.user
  });
}


//End of Goal Options

//View weekly Goals
exports.view_weekly_goals = function (req, res) {
  var user = req.user.user;
  var week = dateFunc.getWeek();

  db.getWeeklyGoals(user, week)
    .then((list) => {
      res.render("viewGoals", {
        title: "View Weekly Goals",
        entries: list,
        user: req.user
      });
      console.log("Promise Resolved");
    })
    .catch((err) => {
      console.log("Promise Rejected", err);
    });
};
//End of View weekly Goals

//Share Link
exports.share_link = function (req, res) {
 res.render("shareLink",
 {
   title: "Share Link",
   user: req.user
 })
};

exports.share_link_guest = function (req, res) {
  var username = req.params.username;
  
  var week = dateFunc.getWeek();
  db.getWeeklyGoals(user, week).then((list) => {
    res.render("shareGoal", {
      entries: list
    })
  })
};

//View Past Goals
exports.view_past_goals = function (req, res) {
  var user = req.user.user;
  var week = dateFunc.getWeek();

  db.getPastGoals(user, week)
    .then((list) => {
      res.render("pastGoals", {
        title: "View Past Goals",
        entries: list,
        user: req.user
      });
      console.log("Promise Resolved");
    })
    .catch((err) => {
      console.log("Promise Rejected", err);
    });
}; //End of View Past Goals

//View Future Goals
exports.view_future_goals = function (req, res) {
  var user = req.user.user;
  var week = dateFunc.getWeek();

  db.getFutureGoals(user, week)
    .then((list) => {
      res.render("futureGoals", {
        title: "View Future Goals",
        entries: list,
        user: req.user
      });
      console.log("Promise Resolved");
    })
    .catch((err) => {
      console.log("Promise Rejected", err);
    });
}; //End of View future Goals


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
    req.user.user
  );
  res.redirect("/view-weekly-goals");
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
    req.body.endTime
  );
  res.redirect("/view-weekly-goals");
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
  res.redirect("/view-weekly-goals");
};
//End of Delete a goal

//Complete Goal
exports.post_complete_goal = function(req, res) {
  console.log("Completing goal..");
  db.completeGoal(req.body.completeButton);
  res.redirect("/view-weekly-goals");
}