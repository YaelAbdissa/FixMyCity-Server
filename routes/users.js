
var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')
const { checkHasPermission } = require('../midddlewares/permission');

/**
 * Get All user s
 * 
 * @route GET /users/
 * @group Admin 
 * @returns {object} 200 - User objects
 * @returns {Error}  default - Unexpected error
 */
router.get('/', userController.viewAllUsers);
//checkHasPermission(['view any user']),

/**
 * Get a user 
 * 
 * @route GET /users/{id}
 * @group Admin 
 * @param {string} id.path.required - user id
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', userController.viewUser);
//checkHasPermission(['view user']),

/**
 * Update a user 
 * 
 * @route PATCH /users/{id}
 * @group User 
 * @param {string} id.path.required - user id
 * @param {USER.model} user.body.required - User body
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.patch('/:id', userController.updateUser);
//checkHasPermission(['update user']),

module.exports = router;
