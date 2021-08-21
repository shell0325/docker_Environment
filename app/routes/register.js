const express = require('express');
const router = express.Router();
const controller = require('../controller/usercontroller/auth.controller');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', controller.createUser);

module.exports = router;
