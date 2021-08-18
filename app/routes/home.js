const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', async (req, res, next) => {
  const cookieToken = req.cookies.token;
  if (cookieToken === undefined) {
    res.redirect('/login');
  } else if (cookieToken !== undefined) {
    const bearer = await cookieToken.split(' ');
    const token = await bearer[0];

    jwt.verify(token, process.env.secretOrKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        res.render('home', {
          user,
        });
      }
    });
  }
});

module.exports = router;
