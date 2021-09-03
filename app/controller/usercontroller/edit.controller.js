const db = require('../../models/index');
const Dashboard = db.Dashboard;
const jwt = require('jsonwebtoken');

exports.editController = async (req, res) => {
  const cookieToken = req.cookies.token;
  const bearer = await cookieToken.split(' ');
  const token = await bearer[0];

  jwt.verify(token, process.env.secretOrKey, async (err, user) => {
    const editId = req.params.id;
    console.log('editId');
    console.log(editId);
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

exports.editPage = async(req, res) => {
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
