const db = require('../../models/index');
const Dashboard = db.Dashboard;
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
