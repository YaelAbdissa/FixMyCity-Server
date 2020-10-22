var express = require('express');
var router = express.Router();


const adminController = require("../controllers/admin.controller")
/**
 * @typedef UserL
 * @property {string} email.required - A Unique email name
 * @property {string} password.required - A strong password
 */

/**
 * Admin Login
 * 
 * @route POST /admin/login
 * @group Admin 
 * @param {UserL.model} admin.body.required - admin Login
 * @returns message says logout
 * @returns {Error}  default - Something went Wrong
 */
router.post('/login', adminController.login);


module.exports = router;
