const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.clearCookie('token')
  res.redirect('/login');
});

module.exports = router;
