const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passport = require('passport');
const UserController = require('../controller/login.controller');

const validateLoginInput = require('../controller/validation/login');

router.get('/', (req, res, next) => {
  res.render('login.ejs');
});

router.post('/', UserController.loginController);

module.exports = router;
