const router = require('express').Router();

router.use('/user', require('./userRoutes'));
router.use('/thought', require('./thoughtRoutes'));

module.exports = router;
