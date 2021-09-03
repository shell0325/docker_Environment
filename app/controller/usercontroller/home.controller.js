const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../../models/index');
const Dashboard = db.Dashboard;

exports.homeController = async (req, res, next) => {
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
        Dashboard.findAll().then(function (results) {
          res.render('home', {
            results,
            user,
          });
        });
      }
    });
  }
};
