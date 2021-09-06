const express = require('express');
const router = express.Router();
const home = require('../controller/home.controller');
const DashboardController = require('../controller/dashboard.controller')

router.get('/', home.homeController);

router.post('/',DashboardController.deleteController)

module.exports = router;
