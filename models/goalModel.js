const nedb = require("nedb");
const { resolve } = require("path");
const dateFunctionality = require("../public/js/dateFunctionality");
const dateFunc = new dateFunctionality();

class Goal {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB Connected to: " + dbFilePath);
    } else {
      this.db = new nedb();
      console.log("DB Running in Memory");
    }
  } //End of constructor

  init() {
    this.db.insert({
      goal: "Go running",
      startDate: "2021-05-15",
      weekStart: "2021-05-10",
      weekEnd: "2021-05-16",
      startTime: "07:00",
      endTime: "10:00",
      completed: true,
      user: "Charley",
    });
    this.db.insert({
      goal: "Walk 20 miles",
      startDate: "2021-05-11",
      weekStart: "2021-05-10",
      weekEnd: "2021-05-16",
      startTime: "07:00",
      endTime: "10:00",
      completed: true,
      user: "Charley",
    });
    this.db.insert({
      goal: "Walk 10 miles",
      startDate: "2021-05-26",
      weekStart: "2021-05-24-",
      weekEnd: "2021-05-30",
      startTime: "07:00",
      endTime: "10:00",
      completed: false,
      user: "Charley",
    });
    this.db.insert({
      goal: "Walk 5 miles",
      startDate: "2021-05-05",
      weekStart: "2021-05-03",
      weekEnd: "2021-05-09",
      startTime: "07:00",
      endTime: "10:00",
      completed: true,
      user: "Charley",
    });
  } //End of init()

  getAllGoals(username) {
    //Return a promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      this.db.find({ user: username }, function (err, entries) {
        if (err) {
          reject(err);
        } else {
          resolve(entries);
          console.log("getAllGoals() returns the following: ", entries);
        }
      });
    });
  } //End of getAllGoals()

//Get week
getWeeklyGoals(user, weekIn) {
  var week = weekIn;
      return new Promise((resolve, reject) => {
          this.db.find(
              {
                  user: user,
                  $and: [
                      {
                          weekStart: {
                              $gte: new Date(week[0])
                                  .toISOString()
                                  .substring(0, 10),
                          },
                      },
                      {
                          weekEnd: {
                              $lte: new Date(week[6])
                                  .toISOString()
                                  .substring(0, 10),
                          },
                      },
                  ],
              },
              function (err, entries) {
                  if (err) {
                      reject(err);
                  } else {
                      dateFunc.sortDates(entries);
                      resolve(entries);
                      console.log("getWeeklyGoals: ", entries);
                  }
              }
          );
      });
} //End of get week

//Get past goals
getPastGoals(user, foWIn) {
  var week = foWIn;
      return new Promise((resolve, reject) => {
          this.db.find(
              {
                  user: user,
                          weekStart: {
                              $lt: new Date(week[0])
                                  .toISOString()
                                  .substring(0, 10),
                          },
              },
              function (err, entries) {
                  if (err) {
                      reject(err);
                  } else {
                      dateFunc.sortDates(entries);
                      resolve(entries);
                      console.log("getPastGoals: ", entries);
                  }
              }
          );
      });
};  //End of get past goals

//Get Future goals
getFutureGoals(user, LoWIn) {
  var week = LoWIn;
      return new Promise((resolve, reject) => {
          this.db.find(
              {
                  user: user,
                          weekEnd: {
                              $gt: new Date(week[6])
                                  .toISOString()
                                  .substring(0, 10),
                          },
              },
              function (err, entries) {
                  if (err) {
                      reject(err);
                  } else {
                      dateFunc.sortDates(entries);
                      resolve(entries);
                      console.log("getFutureGoals: ", entries);
                  }
              }
          );
      });
};  //End of get past goals

  addGoal(goalIn, startTimeIn, endTimeIn, startDateIn, userIn) {
    const week = dateFunc.getStartandEndDays(startDateIn);

    console.log("Adding goal to the database");
    var entry = {
      goal: goalIn,
      startDate: startDateIn,
      weekStart: new Date(week[0]).toISOString().substring(0, 10),
      weekEnd: new Date(week[6]).toISOString().substring(0, 10),
      startTime: startTimeIn,
      endTime: endTimeIn,
      completed: false,
      user: userIn,
    };

    this.db.insert(entry, function (err, doc) {
      if (err) {
        console.log("Error inserting document", goal);
      } else {
        console.log("Document inserted into the database", doc);
      }
    });
  } //End add goal

  //Delete goal
  deleteGoal(id) {
    this.db.remove({ _id: id }, {}, function (err, docsRem) {
      if (err) {
        console.log("Error deleting document.");
      } else {
        console.log(docsRem, "Document(s) removed from database.");
      }
    });
  } //End delete goal

  //Complete Goal
  completeGoal(_id) {
    this.db.update(
      { _id: _id },
      {
        $set: {
          completed: true,
        },
      },
      {},
      function (err, numUp) {
        if (err) {
          console.log("Error completing documents", err);
        } else {
          console.log(numUp, "Document completed.");
        }
      }
    );
  } //End of completeGoal()

  findUpdateGoal(id) {
    return new Promise((resolve, reject) => {
      this.db.find({ _id: id }, function (err, docs) {
        if (err) {
          reject(err);
          console.log("Error");
        } else {
          resolve(docs);
          console.log("Documents retrieved:", docs);
        }
      });
    });
  } //End of findUpdateGoal

  updateGoal(id, goalIn, startTimeIn, endTimeIn) {
    this.db.update(
      { _id: id },
      {
        $set: {
          goal: goalIn,
          startTime: startTimeIn,
          endTime: endTimeIn,
        },
      },
      {},
      function (err, numUp) {
        if (err) {
          console.log("Error updating documents", err);
        } else {
          console.log(numUp, "Document updated.");
        }
      }
    );
  } //End of updateGoal()
}

const dao = new Goal();
dao.init();

module.exports = dao;
