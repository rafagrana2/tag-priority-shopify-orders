/**
 * Bundles router index
 * @author Rafael Granados <rafagranadosscs@gmail.com>
 */
const router = require('express').Router();
const prioPlus = require('./prioplus/prioPlus.route');

router.use('/prioplus', prioPlus);

module.exports = router;