const express = require('express');
const router = express.Router();
const controller = require('../controller/auth.controller');

const validateRegisterInput = require('../controller/validation/register');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', controller.createUser);


module.exports = router;
