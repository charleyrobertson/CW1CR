const nedb = require('nedb');
const { resolve } = require('path');

class Goal {
    constructor(dbFilePath) {
        if(dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true});
            console.log('DB Connected to: ' + dbFilePath);
        } else {
            this.db = new nedb();
            console.log('DB Running in Memory');
        }
    }//End of constructor

    init() {
        this.db.insert({
            goal: 'Go running',
            startDate: '2020-03-10',
            startTime: '07:00',
            endTime: '10:00',
            user: 'Charley'
        })
        this.db.insert({
            goal: 'Walk 5 miles',
            startDate: '2020-03-12',
            startTime: '07:00',
            endTime: '10:00',
            user: 'Charley'
        })
    }//End of init()

    getAllGoals() {
        //Return a promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, entries) {
                if(err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getAllGoals() returns the following: ', entries);
                }
            })
        })
    }//End of getAllGoals()

    addGoal(goalIn, startTimeIn, endTimeIn, startDateIn, userIn) {
        console.log('Adding goal to the database');
        var entry = {
            goal: goalIn,
            startDate: startDateIn,
            startTime: startTimeIn,
            endTime: endTimeIn,
            user: userIn
        }

        this.db.insert(entry, function(err, doc) {
            if(err) {
                console.log('Error inserting document', goal);
            } else {
                console.log('Document inserted into the database', doc);
            }
        })
    }//End add goal

    //Delete goal
    deleteGoal(id) {
        this.db.remove({ _id: id}, {}, function(err, docsRem) {
            if(err) {
                console.log('Error deleting document.');
            } else {
                console.log(docsRem, 'Document(s) removed from database.');
            }
        })
    } //End delete goal

    findUpdateGoal(id) {
        return new Promise((resolve, reject) => {
            this.db.find({'_id': id}, function(err, docs) {
                if(err) {
                    reject(err);
                    console.log('Error');
                } else {
                    resolve(docs);
                    console.log('Documents retrieved:', docs);
                }
            })
        })
        
    }//End of findUpdateGoal

    updateGoal(id, goalIn, startTimeIn, endTimeIn, startDateIn) {
        this.db.update({'_id': id}, {$set: { 'goal': goalIn, 'startTime': startTimeIn, 'endTime': endTimeIn, 'startDate': startDateIn}}, {}, function(err, numUp) {
            if(err) {
                console.log('Error updating documents', err);
            } else {
                console.log(numUp, 'Document updated.');
            }
        })
    }//End of updateGoal()

  
}





module.exports = Goal;