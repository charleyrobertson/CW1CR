const express = require("express");
const path = require("path");
const app = express();
const mustache = require("mustache-express");
const router = require("./routes/routes");
const views = path.join(__dirname, "views");
const public = path.join(__dirname, "public");
const auth = require('./auth/auth');
const passport = require("passport");
const session = require('express-session');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.engine("mustache", mustache());
app.set("view engine", "mustache");

app.use(session({ secret: 'dont tell anyone', resave: false,
saveUninitialized: false })); 
app.use(passport.initialize());
app.use(passport.session());
auth.init(app);


app.use(express.static(public));
app.use(express.static(views));
app.use("/", router);

app.listen(3000, () => {
  console.log("Server started on port 3000. Ctrl^C to quit.");
});
