const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/logout', require('./logout'));
router.use('/create', require('./create'));
router.use('/edit', require('./edit'));
router.use('/delete', require('./delete'));

module.exports = router;
