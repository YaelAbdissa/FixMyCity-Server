
var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')
const adminController = require('../controllers/admin.controller')
const isUser = require('../midddlewares/user')
const isAdmin = require('../midddlewares/admin')
const checkAuth = require('../midddlewares/check_auth');

/**
 * Get All users
 * 
 * @route GET /users/
 * @group User 
 * @security JWT
 * @returns {object} 200 - List of Users
 * @returns {Error}  default - Unexpected error
 */
router.get('/', isAdmin,userController.viewAllUsers);


/**
 * Get Profile of logged in User
 * 
 * @route GET /users/myProfile
 * @group User  
 * @security JWT
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.get('/myProfile',isUser, userController.viewUserProfile);


/**
 * Get a user by Id
 * 
 * @route GET /users/{id}
 * @group User 
 * @param {string} id.path.required - user id
 * @security JWT
 * @returns {object} 200 - A User object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id',checkAuth, userController.viewUser);

/**
 * Update a user 
 * 
 * @route PATCH /users/{id}
 * @group User 
 * @param {string} id.path.required - user id
 * @param {USER.model} user.body.required - User body
 * @security JWT
 * @returns {object} 200 - returns the updated user object 
 * @returns {Error}  default - Unexpected error
 */
router.patch('/', checkAuth, userController.updateUser);
  
router.patch('/changePassword', checkAuth, adminController.changePassword);

/**
 * Remove a User  with id
 * 
 * @route DELETE /Users/{id}
 * @group User 
 * @param {string} id.path.required - user id
 * @security JWT
 * @returns {object} 200 - will return a string that says successfully deleted
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id',isAdmin, userController.removeUser);



module.exports = router;
