const express = require('express');
const router = express.Router();
const deleteBtn = require('../controller/usercontroller/delete.controller');
const createController = require('../controller/usercontroller/create.controller');
const editController = require('../controller/usercontroller/edit.controller');

router.get('/create/', createController.createPage);

router.post('/create/', createController.createDashboards);

router.get('/edit/:id', editController.editPage);

router.post('/edit/:id', editController.editController);

router.delete('/delete/:id', deleteBtn.deleteController);

module.exports = router;
