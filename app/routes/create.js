const express = require('express');
const router = express.Router();
const createController = require('../controller/usercontroller/create.controller');

router.get('/', createController.createPage);

router.post('/', createController.createDashboards);

module.exports = router;
