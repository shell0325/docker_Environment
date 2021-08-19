const bcrypt = require('bcrypt');
const db = require('../models/index');
const User = db.User;
const validateRegisterInput = require('./validation/register');

exports.createUser = (req, res) => {
  console.log(req.body.username);
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.repassword);
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
      console.log('-----');
      console.log(req.body.username);
      console.log(result);
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
