const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', authController.createUser);

module.exports = router;
