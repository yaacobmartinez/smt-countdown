const express = require("express");
const router = express.Router();
const LogsController = require('../controllers/logs')

router.get('/', LogsController.getAll)
router.post('/', LogsController.add)
router.delete('/:id', LogsController.delete)

module.exports = router