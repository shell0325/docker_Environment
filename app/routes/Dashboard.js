const express = require('express');
const router = express.Router();
const DashboardController = require('../controller/dashboard.controller')
// const deleteBtn = require('../controller/usercontroller/delete.controller');
// const createController = require('../controller/usercontroller/create.controller');
// const editController = require('../controller/usercontroller/edit.controller');

router.get('/create/', DashboardController.createPage);

router.post('/create/', DashboardController.createDashboards);

router.get('/edit/:id', DashboardController.editPage);

router.post('/edit/:id', DashboardController.editController);

router.delete('/delete/:id', DashboardController.deleteController);

module.exports = router;
