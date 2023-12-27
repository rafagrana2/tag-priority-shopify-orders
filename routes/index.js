/**
 * Router index
 * @author Rafael Granados <rafagranadosscs@gmail.com>
 */
const router = require('express').Router();
const endpoints = require('./endpoints');

router.use('/endpoints', endpoints);

module.exports = router;
