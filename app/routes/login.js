const express = require('express');
const router = express.Router();
const controller = require('../controller/usercontroller/login.controller');

router.get('/', (req, res, next) => {
  res.render('login.ejs');
});

router.post('/', controller.loginController);

module.exports = router;
