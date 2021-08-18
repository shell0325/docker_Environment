const passport = require('passport');
const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;
require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../models/index');
const User = db.User

module.exports = (app) => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
      },
      function (email, password, done) {
        User.findAll({where:{email}})
          .then(async function (results) {
            if (results.length === 0) {
              return done(null, false, { message: 'Invalid User' });
            } else if (await bcrypt.compare(password, results[0].password)) {
              return done(null, results[0]);
            } else {
              return done(null, false, { message: 'Invalid User' });
            }
          })
          .catch(function (err) {
            console.log(err);
            return done(null, false, { message: err.toString() });
          });
      }
    )
  );

  app.use(passport.initialize());
};
