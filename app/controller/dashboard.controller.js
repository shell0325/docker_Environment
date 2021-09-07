const db = require('../models/index');
const Dashboard = db.Dashboard;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const validateDashboardInput = require('./validation/Dashboard');

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
      heartsNumber: 0,
      heartsOn: false,
    };
    Dashboard.create(DashboardData)
      .then(function () {
        res.redirect('/');
      })
      .catch(function (err) {
        console.log(err);
        res.redirect('/create');
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
    res.redirect('/');
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
        res.redirect('/');
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
