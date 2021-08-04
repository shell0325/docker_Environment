const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use(
  '/',
  // passport.authenticate('jwt', { session: false }),
  require('./home')
);
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/logout', require('./logout'));

module.exports = router;
