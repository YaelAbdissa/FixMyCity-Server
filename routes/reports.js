const express = require('express');
const multer  = require('multer')

const reportModel = require('../models/report.model');
const userModel = require('../models/user.model')
const municipalModel = require('../models/municipal.model')

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
 * @property {string} userEmail.required - Email of the user who is reporting the issue
 * @property {string} municipalName.required - name of municipla to whom reported
 */

/**
 * New Request
 * 
 * @route POST /reports
 * @group Issue 
 * @param {ISSUE.model} issue.body.required - 
 * @returns {object} 200 - Report object
 * @returns {Error}  default - Unexpected error
 */
router.post('/', upload.single('image'),reportController.createReport); 


/**
 * New Request
 * 
 * @route GET /reports
 * @group Issue 
 * @returns {object} 200 - Array of Reports
 * @returns {Error}  default - Unexpected error
 */
router.get('/', reportController.viewAllReport);

module.exports = router;
