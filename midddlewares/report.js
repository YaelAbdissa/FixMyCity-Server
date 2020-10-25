const Joi = require('joi');

exports.validateReport = schemaName => async(req,res ,next)=>{
    let validationObjects = {
        reportIssue : () =>
            Joi.object({
                name : Joi.string(),
                photo_url: Joi.string(),
                description : Joi.string(),
                municipal : Joi.string(),
            })
        
    }
    try {
        const {error } =  validationObjects[schemaName]().validate(req)
        if(!error) {
            return next();
        }
        throw new Error(error)
     } catch (error) {
         res.status(400).json({
             error: true,
             message: error.message
         })
     }
}