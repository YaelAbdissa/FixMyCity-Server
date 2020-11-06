var express = require('express');
var router = express.Router();

const isAdmin = require('../midddlewares/admin')
const isMunicipal = require('../midddlewares/municipal')


const municipalController = require('../controllers/municipal.controller');

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
 * @group Municipality 
 * @security JWT 
 * @returns {object} 200 - Municipality object
 * @returns {Error}  default - Unexpected error
 */
router.get('/',municipalController.getAllMunicipality);

/**
 * Get Profile of logged in Municipality
 * 
 * @route GET /municipality/myProfile
 * @group Municipality  
 * @security JWT
 * @returns {object} 200 - Municipality object
 * @returns {Error}  default - Unexpected error
 */
router.get('/myProfile', isMunicipal, municipalController.viewMunicipalityProfile);

/**
 * Get a Municipality
 * 
 * @route GET /municipality/{id}
 * @group Municipality
 * @param {string} id.path.required - user id  
 * @security JWT
 * @returns {object} 200 - Municipality object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id',municipalController.getMunicipalityById);


/**
 * New Request
 * 
 * @route POST /municipality
 * @group Municipality 
 * @param {Municipality.model} Municipality.body.required -
 * @security JWT 
 * @returns {object} 200 - Report object
 * @returns {Error}  default - Unexpected error
 */
router.post('/',isAdmin,municipalController.addMunicipal);


/**
 * Municipality Login
 * 
 * @route POST /municipality/login
 * @group Auth 
 * @param {Municipality.model} Municipality.body.required - 
 * @returns {object} 200 - Report object
 * @returns {Error}  default - Unexpected error
 */
router.post('/login',municipalController.login);


/**
 * Remove a Municipality  with id
 * 
 * @route DELETE /municipality/{id}
 * @group Municipality 
 * @param {string} id.path.required - user id
 * @security JWT
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', isAdmin, municipalController.remove);

/**
 * Update a Municipality  with id
 * 
 * @route PATCH /municipality/{id}
 * @group Municipality 
 * @param {string} id.path.required - user id
 * @param {Municipality.model} Municipality.body.required - 
 * @security JWT
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.patch('/:id',isAdmin, municipalController.update);


module.exports = router;
