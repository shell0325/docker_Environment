const express = require('express');
const router = express.Router();
const DashboardController = require('../controller/dashboard.controller');

router.get('/', DashboardController.DashboardController);

router.post('/', DashboardController.likesController);

router.get('/create', DashboardController.createPage);

router.post('/create', DashboardController.createDashboards);

router.get('/edit/:id', DashboardController.editPage);

router.post('/edit/:id', DashboardController.editController);

router.delete('/delete/:id', DashboardController.deleteController);

router.post('/likes/:id', DashboardController.likesController);

module.exports = router;
