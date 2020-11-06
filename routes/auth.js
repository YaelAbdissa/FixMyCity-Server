var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth.controller');
const { validatRequest } =require('../midddlewares/validation/auth')

/**
 * @typedef USER
 * @property {string} first_name.required - A Unique user name
 * @property {string} last_name.required - A Unique user name
 * @property {string} email.required - A Unique email name
 * @property {string} password.required - A strong password
 */

 /**
 * @typedef ResetPass
 * @property {string} resetLink.required - A reset Link that is emailed to you
 * @property {string} newPass.required - New Password
 */
 
/**
 * Login
 * 
 * @route POST /auth/login 
 * @group Auth 
 * @param {UserL.model} user.body.required - User Login 
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', validatRequest('loginUser'), authController.login);

/**
 * Signup
 * 
 * @route POST /auth/signup
 * @group Auth 
 * @param {USER.model} user.body.required - User Sign UP
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.post('/signup', validatRequest('createUser'),authController.signup);

/**
 * Logout
 * 
 * @route POST /auth/logout
 * @group Auth 
 * @returns 200 - message says logout
 * @returns {Error}  default - Something went Wrong
 */
router.post('/logout', authController.logout);

/**
 * Forgot Password
 * 
 * @route POST /auth/forget-password
 * @group Auth 
 * @param {USER.model} user.body.required - you must provide only an email
 * @returns {object} 200 - a message says resent link is sent 
 * @returns {Error}  default - Unexpected error
 */
router.post('/forget-password',validatRequest('forgetPassword'), authController.forgetPassword);

/**
 * Reset Password
 * 
 * @route PUT /auth/reset-password
 * @group Auth 
 * @param {ResetPass.model} reset_pass.body.required - Reset Password
 * @returns {object} 200 - a message 
 * @returns {Error}  default - Unexpected error
 */
router.put('/reset-password',  authController.resetPassword);



module.exports = router;