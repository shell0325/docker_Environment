const db = require('../models/index');
const Dashboard = db.Dashboard;
const Likes = db.Likes;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const validateDashboardInput = require('./validation/Dashboard');

exports.DashboardController = async (req, res, next) => {
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

exports.createDashboards = async (req, res) => {
  const { errors, isValid } = validateDashboardInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const cookieToken = req.cookies.token;
  const bearer = await cookieToken.split(' ');
  const token = await bearer[0];

  jwt.verify(token, process.env.secretOrKey, (err, user) => {
    const email = user.email;
    const username = user.username;
    const title = req.body.title;
    const content = req.body.content;
    const userId = user.id;
    const DashboardData = {
      email: email,
      username: username,
      title: title,
      content: content,
      userId: userId,
      LikesNumber: 0,
    };
    Dashboard.create(DashboardData)
      .then(function () {
        res.redirect('/dashboards');
      })
      .catch(function (err) {
        console.log(err);
        res.redirect('/dashboards/create');
      });
  });
};

exports.createPage = async (req, res) => {
  const cookieToken = req.cookies.token;
  if (cookieToken === undefined) {
    res.redirect('/login');
  }
  const bearer = await cookieToken.split(' ');
  const token = await bearer[0];

  jwt.verify(token, process.env.secretOrKey, (err, user) => {
    res.render('create', {
      user: user,
    });
  });
};

exports.deleteController = async (req, res) => {
  const cookieToken = req.cookies.token;
  const bearer = await cookieToken.split(' ');
  const token = await bearer[0];

  jwt.verify(token, process.env.secretOrKey, async (err, user) => {
    const DashboardId = req.params.id;
    const Data = await Dashboard.findByPk(DashboardId);
    if (Data) {
      await Data.destroy();
    }
    res.redirect('/dashboards');
  });
};

exports.editController = async (req, res) => {
  const { errors, isValid } = validateDashboardInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const cookieToken = req.cookies.token;
  const bearer = await cookieToken.split(' ');
  const token = await bearer[0];

  jwt.verify(token, process.env.secretOrKey, async (err, user) => {
    const editId = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    await Dashboard.update(
      { title: title, content: content },
      { where: { id: editId } }
    )
      .then(() => {
        res.redirect('/dashboards');
      })
      .catch((err) => {
        res.redirect('/edit/:id');
        console.log(err);
      });
  });
};

exports.editPage = async (req, res) => {
  const cookieToken = req.cookies.token;
  const bearer = await cookieToken.split(' ');
  const token = await bearer[0];
  const editId = req.params.id;

  jwt.verify(token, process.env.secretOrKey, async (err, user) => {
    const Data = await Dashboard.findByPk(editId);
    res.render('edit', {
      user: user,
      editId: editId,
      Data: Data,
    });
  });
};

exports.likesController = async (req, res) => {
  const cookieToken = req.cookies.token;
  const bearer = await cookieToken.split(' ');
  const token = await bearer[0];
  const LikesId = req.params.id;
  const DashboardData = await Dashboard.findByPk(LikesId);

  jwt.verify(token, process.env.secretOrKey, async (err, user) => {
    Likes.findOne({
      where: {
        baseUserId: DashboardData.userId,
        actionUserId: user.id,
        DashboardId: DashboardData.id,
      },
    }).then(async (likesData) => {
      if (likesData) {
        await likesData.destroy();
        let LikesNumber = DashboardData.LikesNumber - 1;
        Dashboard.update(
          { LikesNumber: LikesNumber },
          { where: { id: DashboardData.id } }
        );
      } else if (!likesData) {
        Likes.create({
          baseUserId: DashboardData.userId,
          actionUserId: user.id,
          DashboardId: DashboardData.id,
        }).then(() => {
          let LikesNumber = DashboardData.LikesNumber + 1;
          Dashboard.update(
            { LikesNumber: LikesNumber },
            { where: { id: DashboardData.id } }
          );
        });
      }
      return res.redirect('/dashboards');
    });
  });
};
