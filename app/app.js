const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();

const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
});

require('./config/passport')(app);

app.use(passport.initialize());
app.use('/', require('./routes/index'));


app.listen(port);
