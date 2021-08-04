const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

const validateRegisterInput = require('../validation/register');

router.get('/', checkNotAuthenticated, (req, res) => {
  knex('user')
    .select('*')
    .then(function (result) {
      console.log(result);
    });
  res.render('register.ejs');
});

router.post('/', checkNotAuthenticated, (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const repassword = req.body.repassword;

  knex('user')
    .where({ email: email })
    .select('*')
    .then(async function (result) {
      if (result.length !== 0) {
        res.render('register', {
          errorMessage: ['このユーザーはすでに使用されています。'],
        });
      } else if (password === repassword) {
        const hashPassword = await bcrypt.hash(password, 10);
        console.log('hashPassword');
        console.log(hashPassword);
        knex('user')
          .insert({ username: username, email: email, password: hashPassword })
          .then(function () {
            res.redirect('/login');
          })
          .catch(function (err) {
            console.error(err);
            res.render('register', {
              errorMessage: [err.sqlMessage],
            });
          });
      } else {
        res.render('register', {
          errorMessage: ['パスワードが一致しません'],
        });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.render('register', {
        errorMessage: ['err.sqlMessage'],
      });
    });
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

module.exports = router;
