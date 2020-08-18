var express = require('express');
var router = express.Router();

const drugRouter = require('./drug');
const pharmacyRouter = require('./pharmacy');

router.use('/drug', drugRouter);
router.use('/', pharmacyRouter);

module.exports = router;
