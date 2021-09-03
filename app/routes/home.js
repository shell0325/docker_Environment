const express = require('express');
const router = express.Router();
const home = require('../controller/usercontroller/home.controller');
const deleteBtn = require('../controller/usercontroller/delete.controller')

router.get('/', home.homeController);

router.post('/',deleteBtn.deleteController)

module.exports = router;
