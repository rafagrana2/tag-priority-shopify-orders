/**
 * Handle routes for Bundle controller
 * @author Rafael Granados <rafagranadosscs@gmail.com>
 */
const router = require('express').Router();

const PrioPlusController = require('../../../controllers/prioplus/prioplus.controller');

const prioPlusInstance = new PrioPlusController();

router.post('/check-prio', prioPlusInstance.checkPrioPlus);

module.exports = router;