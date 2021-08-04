const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = require('./user');
require('dotenv').config();

module.exports = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.secretOrKey,
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
};
