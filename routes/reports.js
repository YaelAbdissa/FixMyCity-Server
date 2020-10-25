const express = require('express');
const multer  = require('multer')


const { checkHasPermission } = require('../midddlewares/permission');
const { validateReport } =require('../midddlewares/report')

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
 * @group Issue 
 * @param {ISSUE.model} issue.body.required - 
 * @returns {object} 200 - Report object
 * @returns {Error}  default - Unexpected error
 */
router.post('/',upload.single('image'),reportController.createReport); 

router.get('/reportsForMe', reportController.forMunicipal)
//checkHasPermission(['view any issue']) ,
/**
 * Get reports by me
 * 
 * @route GET /reports/myreport
 * @group Issue 
 * @returns {object} 200 - Array of Reports
 * @returns {Error}  default - Unexpected error
 */
router.get('/myReport/:id', reportController.viewMyReport);
//checkHasPermission(['view any issue']) ,
/**
 * Get All Reports
 * 
 * @route GET /reports
 * @group Issue 
 * @returns {object} 200 - Array of Reports
 * @returns {Error}  default - Unexpected error
 */
router.get('/', reportController.viewAllReport);
//checkHasPermission(['view any issue']) ,
/*
 * Get Specific User
 * 
 * @route GET /reports
 * @group Issue 
 * @param {string} id.path.required - report id
 * @returns {object} 200 - Array of Reports
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', reportController.viewReportById);
//checkHasPermission(['view any issue','view issue']) ,

/**
 * Update an a Report /Fix report By municipal 
 * 
 * @route PATCH /users/:id
 * @group User
 * @param {string} id.path.required - user id
 * @security JWT
 * @returns {USER.model} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id',  reportController.resolveReport);
//checkHasPermission(['update issue']),




module.exports = router;
