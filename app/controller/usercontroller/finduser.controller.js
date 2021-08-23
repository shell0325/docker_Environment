const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.findUser = async(req, res) => {
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
};
