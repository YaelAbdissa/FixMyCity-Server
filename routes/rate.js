var express = require('express');
var router = express.Router();

const isUser = require('../midddlewares/user')

const checkAuth = require('../midddlewares/check_auth');

const rateController = require('../controllers/rate.controller');

router.get('/:id', checkAuth ,rateController.viewRating);
router.post('/:id', isUser, rateController.addRating);

module.exports = router;