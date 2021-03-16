//Import goals class
const { response } = require('express');
const GoalDAO = require('../models/goalModel');
const db = new GoalDAO();

//Home
exports.home_page = function(req, res) {
    res.render('home');
    db.init();
    console.log('Database Initialized');
}
//End of Home

//View All Goals
exports.view_goals = function(req, res) {
    db.getAllGoals().then((list) => {
        res.render('viewGoals', {
            'title': 'View All Training Goals',
            'entries': list
        });
        console.log('Promise Resolved');
    }).catch((err) => {
        console.log('Promise Rejected', err);
    })
}
//End of View All Goals