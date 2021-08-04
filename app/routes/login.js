const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const User = require('../config/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
require('dotenv').config();
const passport = require('passport');

const validateLoginInput = require('../validation/login');

router.get('/', (req, res, next) => {
  res.render('login.ejs');
});

// router.post('/', passport.authenticate('jwt', {session:false
//   // failureRedirect: '/login',
//   // successRedirect: '/',
// }),

//最新
// router.post('/', function (req, res, next) {
//   console.log('+++++++');
//   'login',
//   passport.authenticate('login', { session: false, failureRedirect: '/login' }),
//     (err, user, info) => {
//       console.log(user);
//       console.log('------');
//       // const { errors, isValid } = validateLoginInput(req.body);
//       console.log('samplesample');
//       // if (!isValid) {
//       //   return res.status(400).json(errors);
//       // }
//       const email = req.body.email;
//       const password = req.body.password;
//       const username = req.body.username;

//       knex('user')
//         .where({
//           username: username,
//           email: email,
//         })
//         .select('*')
//         .then(async (results) => {
//           console.log('testtesttest');
//           User.findById(results[0].id).then((user) => {
//             console.log(user);
//             if (!user) {
//               return res.redirect('/login');
//             } else {
//               req.login(user, { session: false }, (err) => {
//                 bcrypt.compare(password, user.password).then((isMatch) => {
//                   if (isMatch) {
//                     const payload = { id: user.id, name: user.username }; //create JWT Payload
//                     const token = jwt.sign(payload, process.env.secretOrKey);
//                     res.json({
//                       user,
//                       token,
//                     });
//                   } else {
//                     return res.redirect('/login');
//                   }
//                 });
//               });
//             }
//           });
//         })
//         .catch(function (err) {
//           console.log(err);
//         });
//     };
//   console.log('456448945651549614');
// });

//zennloginコピー時
// function(req, res) {
// router.post('/', (req, res) => {
//   console.log(req)
//   const { errors, isValid } = validateLoginInput(req.body);

//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   const email = req.body.email;
//   const password = req.body.password;
//   const username = req.body.username;

//   knex('user')
//     .where({
//       username: username,
//       email: email,
//     })
//     .select('*')
//     .then((results) => {
//       User.findById(results[0].id).then((user) => {
//         console.log(user);
//         if (!user) {
//           return res.redirect('/login');
//         }
//         bcrypt.compare(password, user.password).then((isMatch) => {
//           if (isMatch) {
//             const payload = { id: user.id, name: user.username }; //create JWT Payload
//             jwt.sign(
//               payload,
//               process.env.secretOrKey,
//               { expiresIn: 3600 },
//               (err, token) => {
//                 const authorization = req.headers.authorization;
//                 req.headers.authorization = token;
//                 console.log('req.headers');
//                 console.log(req.headers);
//                 //   // res.render('home', {
//                 //   //   user:user
//                 //   // })
//                 // res.redirect('/');
//                 res.json({
//                   success: true,
//                   user: user,
//                   token: 'Bearer ' + token,
//                 });
//                 // res.redirect('/')
//               }
//             );
//             // return res.redirect('/');
//           } else {
//             return res.redirect('/login');
//           }
//         });
//       });
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// });

router.post(
  '/',
  checkNotAuthenticated,
  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

module.exports = router;
