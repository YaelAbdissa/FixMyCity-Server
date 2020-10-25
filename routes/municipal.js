var express = require('express');
var router = express.Router();
const municipalController = require('../controllers/municipal.controller');
const { checkHasPermission } = require('../midddlewares/permission');
/**
 * @typedef Municipality
 * @property {string} username.required - username of Municipality 
 * @property {string} name.required - name of Municipality 
 * @property {string} password -Password 
 */

/**
 * Get All Municipalities
 * 
 * @route GET /municipality
 * @group Admin  
 * @returns {object} 200 - Municipality object
 * @returns {Error}  default - Unexpected error
 */
router.get('/',municipalController.getAllMunicipality);
//checkHasPermission(['view any municipal']),

/**
 * New Request
 * 
 * @route POST /municipality
 * @group Admin 
 * @param {Municipality.model} Municipality.body.required - 
 * @returns {object} 200 - Report object
 * @returns {Error}  default - Unexpected error
 */
router.post('/',municipalController.addMunicipal);
//checkHasPermission(['create municipal']),

/**
 * Municipality Login
 * 
 * @route POST /municipality/login
 * @group Municipality 
 * @param {Municipality.model} Municipality.body.required - 
 * @returns {object} 200 - Report object
 * @returns {Error}  default - Unexpected error
 */
router.post('/login',municipalController.login);


/**
 * Remove a Municipality  with id
 * 
 * @route DELETE /municipality/{id}
 * @group Admin 
 * @param {string} id.path.required - user id
 * @security JWT
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', municipalController.remove);
//checkHasPermission(['remove municipal']),

/**
 * Update a Municipality  with id
 * 
 * @route PATCH /municipality/{id}
 * @group Admin 
 * @param {string} id.path.required - user id
 * @param {Municipality.model} Municipality.body.required - 
 * @security JWT
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.patch('/:id', municipalController.update);
// //checkHasPermission(['update municipal']),
module.exports = router;
