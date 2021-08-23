const express = require('express');
const router = express.Router();
const controller = require('../controller/usercontroller/finduser.controller');

router.get('/', controller.findUser);

module.exports = router;
