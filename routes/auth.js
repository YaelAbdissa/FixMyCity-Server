var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth.controller');

/**
 * @typedef USER
 * @property {string} first_name.required - A Unique user name
 * @property {string} last_name.required - A Unique user name
 * @property {string} email.required - A Unique email name
 * @property {string} password.required - A strong password
 */

/**
 * Login
 * 
 * @route POST /auth/login
 * @group Auth 
 * @param {USER.model} user.body.required - 
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', authController.login);

/**
 * Signup
 * 
 * @route POST /auth/signup
 * @group Auth 
 * @param {USER.model} user.body.required - 
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.post('/signup', authController.signup);


router.post('/forget-password', authController.forgetPassword);


router.post('/reset-password', authController.resetPassword);
router.post('/activate/:token', authController.activate);

module.exports = router;



// router.get('/login', function(req, res, next) {
//     res.render('auth/login', {title:'Login'});
// });

// router.get('/signup', function(req, res, next) {
//     res.render('auth/signup', {title:'signup'});
// });

// router.get('/forget-password', function(req, res, next) {
//     res.render('auth/forget-password', {title:'signup'});
// });

// router.get('/reset-password', function(req, res, next) {
//     res.render('auth/reset-password', {title:'reset Password'});
// });

