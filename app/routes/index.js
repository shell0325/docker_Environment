const express = require('express');
const router = express.Router();

router.use('/dashboards', require('./dashboards'));
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/logout', require('./logout'));

module.exports = router;
