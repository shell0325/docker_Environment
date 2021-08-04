const passport = require('passport');
const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = require('./user');
require('dotenv').config();
const session = require('express-session');
const knex = require('../db/knex');
const keys = require('./keys');
const bcrypt = require('bcrypt');


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
        knex('user')
          .where({
            // username: username,
            email: email,
          })
          .select('*')
          .then(async function (results) {
            console.log('passportresults');
            console.log(results);
            if (results.length === 0) {
              console.log('0');
              return done(null, false, { message: 'Invalid User' });
            } else if (await bcrypt.compare(password, results[0].password)) {
              console.log('ok');
              return done(null, results[0]);
            } else {
              console.log('no');
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

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.secretOrKey,
        // secretOrKey: keys.secretOrKey,
      },
      function (jwt_payload, done) {
        User.findById(jwt_payload.id)
          .then((user) => {
            console.log('useruseruseruseruseruseru');
            console.log(user);
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch((err) => console.log(err));
      }
    )
  );

  app.use(passport.initialize());

  app.use(passport.session());
};

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.secretOrKey;

// module.exports = (app) => {
//   passport.serializeUser(function (user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(async function (id, done) {
//     try {
//       const user = await User.findById(id);
//       done(null, user);
//     } catch (error) {
//       done(error, null);
//     }
//   });

//   passport.use(
//     new JwtStrategy(opts, (jwt_payload, done) => {
//       console.log('---------');
//       User.findById(jwt_payload.id)
//         .then((user) => {
//           console.log('useruseruseruseruseruseru');
//           console.log(user);
//           if (user) {
//             return done(null, user);
//           }
//           return done(null, false);
//         })
//         .catch((err) => console.log(err));
//     })
//   );
//   app.use(
//     session({
//       // secret: process.env.secretOrKey,
//       secret: 'secret',
//     })
//   );

//   app.use(passport.initialize());
//   app.use(passport.session());
// };
