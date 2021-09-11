const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models/index');
const Dashboard = db.Dashboard;
const Likes = db.Likes;

exports.homeController = async (req, res, next) => {
  const cookieToken = req.cookies.token;
  if (cookieToken === undefined) {
    res.redirect('/login');
  } else if (cookieToken !== undefined) {
    const bearer = await cookieToken.split(' ');
    const token = await bearer[0];

    jwt.verify(token, process.env.secretOrKey, async (err, user) => {
      const LikesData = await Likes.findAll({
        where: {
          actionUserId: user.id,
        },
        attributes: {
          exclude: [
            'id',
            'baseUserId',
            'actionUserId',
            'createdAt',
            'updatedAt',
          ],
        },
      });
      const LikesDatas = [];
      for (i = 0; i < LikesData.length; i++) {
        LikesDatas.push(LikesData[i].DashboardId);
      }
      if (err) {
        return res.sendStatus(403);
      } else {
        Dashboard.findAll().then(function (results) {
          res.render('home', {
            results,
            user,
            LikesDatas,
          });
        });
      }
    });
  }
};
