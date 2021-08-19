const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passport = require('passport');

const validateLoginInput = require('../controller/validation/login');

router.get('/', (req, res, next) => {
  res.render('login.ejs');
});

router.post('/', async (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        res.render('login', {
          errorMessage: ['このユーザーは存在しません'],
        });
      }
      if (user.email !== req.body.email) {
        res.render('login', {
          errorMessage: ['ユーザー情報が間違っています'],
        });
      } else {
        req.login(user, { session: false }, async (error) => {
          if (error) {
            return res.redirect('/login');
          }
          const body = {
            id: user.id,
            email: user.email,
            username: user.username,
          };
          const token = jwt.sign(body, process.env.secretOrKey);
          res.cookie('token', token, { httpOnly: true });
          res.redirect('/');
        });
      }
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
