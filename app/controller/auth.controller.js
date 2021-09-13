const bcrypt = require('bcrypt');
const db = require('../models/index');
const User = db.User;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passport = require('passport');
const validateRegisterInput = require('./validation/register');
const validateLoginInput = require('./validation/login');

exports.createUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const repassword = req.body.repassword;

  User.findAll({ where: { email } })
    .then(async function (result) {
      if (result.length !== 0) {
        res.render('register', {
          errorMessage: ['このメールアドレスはすでに使用されています。'],
        });
      } else if (password === repassword) {
        const hashPassword = await bcrypt.hash(password, 10);
        const UserData = {
          username: username,
          email: email,
          password: hashPassword,
        };
        User.create(UserData)
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
};

exports.loginController = (req, res, next) => {
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
          res.redirect('/dashboards');
        });
      }
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
