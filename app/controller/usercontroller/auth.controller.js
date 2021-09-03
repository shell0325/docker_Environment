const bcrypt = require('bcrypt');
const db = require('../../models/index');
const User = db.User;
const validateRegisterInput = require('../validation/register');

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
