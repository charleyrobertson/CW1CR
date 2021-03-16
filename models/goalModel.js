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
}

module.exports = Goal;