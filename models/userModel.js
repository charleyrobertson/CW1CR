const Datastore = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class UserDAO {
  constructor(dbFilePath) {
    if (dbFilePath) {
      //embedded
      this.db = new Datastore({ filename: dbFilePath, autoload: true });
    } else {
      //in memory
      this.db = new Datastore();
    }
  }

  init() {
    this.db.insert({
      user: "Charley",
      email: "charley@gmail.com",
      name: "Charley",
      dob: "2000-11-16",
      password: "$2a$10$s3g4WOBRo1u1dFTuRrmlduYekquhp0JJvHl0C/ArriNl5bWoNtrHC",
    });
    console.log('Charley - User record inserted in init');

    return this;
  }
  create(username, email, name, dob, password) {
    const that = this;
    bcrypt.hash(password, saltRounds).then(function (hash) {
      var entry = {
        user: username,
        email: email,
        name: name,
        dob: dob,
        password: hash,
      };
      console.log('user entry is: ', entry);

      that.db.insert(entry, function (err) {
        if (err) {
          console.log("Can't insert user: ", username);
        }
      });
    });
  }
  lookup(user, cb) {
    this.db.find({ user: user }, function (err, entries) {
      if (err) {
        return cb(null, null);
      } else {
        if (entries.length == 0) {
          return cb(null, null);
        }
        return cb(null, entries[0]);
      }
    });
  }
}

const dao = new UserDAO();
dao.init();
module.exports = dao;