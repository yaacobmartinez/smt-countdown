const express = require("express");
const router = express.Router();

router.use('/logs', require('./logs'))

module.exports = router


