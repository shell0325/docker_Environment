const express = require('express');
const router = express.Router();
const db = require('../models/index');
const Dashboard = db.Dashboard;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const deleteBtn = require('../controller/usercontroller/delete.controller');

router.post('/:id', deleteBtn.deleteController);

module.exports = router;
