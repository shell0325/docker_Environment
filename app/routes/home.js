const express = require('express');
const router = express.Router();
const homeController = require('../controller/home.controller');
const DashboardController = require('../controller/dashboard.controller');

router.get('/', homeController.homeController);

router.post('/', DashboardController.likesController);

module.exports = router;
