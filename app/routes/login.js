const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

router.get('/', (req, res, next) => {
  res.render('login.ejs');
});

router.post('/', authController.loginController);

module.exports = router;
