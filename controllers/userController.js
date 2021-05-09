const { response } = require("express");
const UserDAO = require("../models/userModel");

//Register
exports.register_user = function(req, res) {
    res.render('register');
};

exports.post_register_user = function(req, res) {
    const user = req.body.username;
    const email = req.body.email;
    const name = req.body.name;
    const dob = req.body.dob;
    const password = req.body.pass;
    //console.log("register user", user, "password", password);
  
    if (!user || !password) {
      res.send(401, "no user or no password");
      return;
    }
    UserDAO.lookup(user, function (err, u) {
      if (u) {
        res.send(401, "User exists:", user);
        return;
      }
      UserDAO.create(user, email, name, dob, password);
      res.redirect("/login");
    });
};
//End of Register

//Login
exports.login_user = function(req, res) {
    res.render("login");
};

exports.post_login_user = function(req, res) {
    res.redirect('/');
};
//End of Login

//Logout 
exports.logout = function(req, res) {
    req.logout();
    res.redirect("/");
};
//End of Logout