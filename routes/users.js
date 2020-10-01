
var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')
const { checkHasPermission } = require('../midddlewares/permission');

/**
 * Create a new user 
 * 
 * @route GET /users/{id}
 * @group User 
 * @param {string} id.path.required - user id
 * @security JWT
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.get('/', checkHasPermission(['view all user']),userController.viewAllUsers);
router.get('/:id', checkHasPermission(['view user']),userController.viewUser);
router.get('/:id', checkHasPermission(['update user']),userController.updateUser);


module.exports = router;
