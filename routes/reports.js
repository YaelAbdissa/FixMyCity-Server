const express = require('express');
const multer  = require('multer')

const isAdmin = require('../midddlewares/admin')
const isMunicipal = require('../midddlewares/municipal')



const { checkHasPermission } = require('../midddlewares/permission');
const { validateReport } =require('../midddlewares/validation/report')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
      },
})

const upload = multer({ storage :storage })

var router = express.Router();

var reportController = require('../controllers/report.controller')

/**
 * @typedef ISSUE
 * @property {string} name.required - name of Issue to be Reported
 * @property {string} description.required - Description Issue
 * @property {string} image - Photo of Issue 
 * @property {string} userEmail.required - Email of the user who is reporting the issue
 * @property {string} municipalName.required - name of municipla to whom reported
 */


/**
 * Create Report
 * 
 * @route POST /reports
 * @group Report 
 * @param {ISSUE.model} issue.body.required - 
 * @security JWT
 * @returns {object} 200 - Report object
 * @returns {Error}  default - Unexpected error
 */
router.post('/',upload.single('image'), checkHasPermission("create issue"),reportController.createReport); 

/**
 * Get list of Reports for municipality
 * 
 * @route get /reports/reportsForMe
 * @group Report 
 * @param {ISSUE.model} issue.body.required -
 * @security JWT 
 * @returns {object} 200 - Report object
 * @returns {Error}  default - Unexpected error
 */
router.get('/reportsForMe', isMunicipal,reportController.forMunicipal)



/**
 * Get reports by the logged in user
 * 
 * @route GET /reports/myreport
 * @group Report 
 * @security JWT
 * @returns {object} 200 - Array of Reports
 * @returns {Error}  default - Unexpected error
 */
router.get('/myReport', checkHasPermission("view any issue"),reportController.viewMyReport);


/**
 * Get All Reports
 * 
 * @route GET /reports
 * @group Report 
 * @security JWT
 * @returns {object} 200 - Array of Reports
 * @returns {Error}  default - Unexpected error
 */
router.get('/', reportController.viewAllReport);


/** 
 * Get Specific User
 * 
 * @route GET /reports/{id}
 * @group Report 
 * @param {string} id.path.required - report id
 * @security JWT
 * @returns {object} 200 - Array of Reports
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', reportController.viewReportById);


/**
 * Update an a Report /Fix report By municipal 
 * 
 * @route PUT /reports/{id}
 * @group Report
 * @param {string} id.path.required - user id
 * @security JWT
 * @returns {USER.model} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', isMunicipal, reportController.resolveReport);


/**
 * Delete a Report  
 * 
 * @route DElete /reports/{id}
 * @group Report
 * @param {string} id.path.required - user id
 * @security JWT
 * @returns {USER.model} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', isAdmin, reportController.removeReport);




module.exports = router;
