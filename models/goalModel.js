const nedb = require("nedb");
const { resolve } = require("path");

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
      startDate: "2021-04-10",
      startTime: "07:00",
      endTime: "10:00",
      completed: true,
      user: "Charley",
    });
    this.db.insert({
      goal: "Walk 5 miles",
      startDate: "2021-05-03",
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
  getWeeklyGoals(){
     let curr = new Date;
     let week = [];
     let day1 = new Date;
    
     for(let i=1; i <=7; i++)
     {
       let first = curr.getDate() - curr.getDay() + i;
       let day = new Date(curr.setDate(first)).toISOString().slice(0,10);
       week.push(day);
     }

    console.log(week);
    
    return new Promise((resolve, reject) => {
      this.db.find({ startDate: week  }, function (err, entries) {
         if (err) {
           reject(err);
         } else {
           resolve(entries);
           console.log("getWeeklyGoals() returns the following: ", entries);
         }
       });
     });
    
  }//End of get week


  addGoal(goalIn, startTimeIn, endTimeIn, startDateIn, userIn) {
    console.log("Adding goal to the database");
    var entry = {
      goal: goalIn,
      startDate: startDateIn,
      startTime: startTimeIn,
      endTime: endTimeIn,
      completed: false,
      user: userIn
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
          completed: true
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

  updateGoal(id, goalIn, startTimeIn, endTimeIn, startDateIn) {
    this.db.update(
      { _id: id },
      {
        $set: {
          goal: goalIn,
          startTime: startTimeIn,
          endTime: endTimeIn,
          startDate: startDateIn,
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

