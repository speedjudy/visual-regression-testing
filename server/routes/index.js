const router = require('express').Router();

// router.use('/api/auth', require('./api/auth'));
// router.use('/api/users', require('./api/users'));
router.use('/test', require('./api/test'));
module.exports = router;
