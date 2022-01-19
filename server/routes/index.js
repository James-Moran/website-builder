const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/shops', require('./shops'));

module.exports = router;