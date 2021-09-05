const db = require('../../models/index');
const Dashboard = db.Dashboard;
const jwt = require('jsonwebtoken');
const validateDashboardInput = require('../validation/Dashboard');

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

  jwt.verify(token, process.env.secretOrKey, (err, user) => {
    res.render('edit', {
      user: user,
      editId: editId,
    });
  });
};
