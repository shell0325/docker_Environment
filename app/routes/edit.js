const express = require('express');
const router = express.Router();
const editController = require('../controller/usercontroller/edit.controller');

router.get('/:id', editController.editPage);

router.post('/:id', editController.editController);

module.exports = router;
