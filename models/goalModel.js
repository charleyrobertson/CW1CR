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
      startDate: "2021-05-06",
      weekStart: "2021-05-03",
      weekEnd: "2021-05-09",
      startTime: "07:00",
      endTime: "10:00",
      completed: true,
      user: "Charley",
    });
    this.db.insert({
      goal: "Walk 5 miles",
      startDate: "2021-05-04",
      weekStart: "2021-05-03",
      weekEnd: "2021-05-09",
      startTime: "07:00",
      endTime: "10:00",
      completed: false,
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
                        resolve(entries);
                        console.log("getWeeklyGoals: ", entries);
                    }
                }
            );
        });
  } //End of get week

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
