var express = require('express');
var router = express.Router();
const checkAuth = require('../midddlewares/check_auth');

const tokenController = require('../controllers/token.controller')

router.post('/getToken',checkAuth,tokenController.refreshToken)
module.exports = router;
