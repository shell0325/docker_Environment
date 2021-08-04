const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
require('dotenv').config();
const JwtMiddleware = require('express-jwt');

router.get('/', async (req, res) => {
  // router.get('/', passport.authenticate('jwt', { session: false }), (req, res) =>{
  // const bearToken = await req.headers['authorization'];
  const bearToken = await req.headers.authorization;
  console.log(req.body.username);
  if (bearToken !== undefined) {
    const bearer = await bearToken.split(' ');
    const token = await bearer[1];

    jwt.verify(token, process.env.secretOrKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        // return res.render('home', {
        //   user: user,
        // });
        return res.json({
          user,
          token,
        });
      }
    });
  }
});

router.get('/', (req, res) => {
  console.log(req.isAuthenticated);
  res.render('home.ejs');
});

router.post('/', (req, res) => {
  res.render('home');
});

function checkAuthenticated(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
