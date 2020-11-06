

const reportModel = require('../models/report.model');
const rateModel = require('../models/rate.model');
const municipalModel = require('../models/municipal.model')
const { jwt_key } = require('../config/vars')

exports.viewRating = async(req,res) =>{
    try {
        const municipal = await municipalModel.findById(req.params.id)
        .populate({ path: 'rate', populate: {path: 'user'} })
        if(municipal){
            return res.status(200).json(municipal)
        }
        res.status(200).json({
            error: false,
            message: "Municipal not found"
        })
        
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.addRating = async(req,res) =>{
    try {
        const user_id = req.user.data._id;
        
        const report = await reportModel.findById(req.params.id)
        if(report){
            if(report.isResolved && user_id == report.reported_by){
                const rate = await new rateModel({
                    user : user_id,
                    report: req.params.id,
                    municipal : report.reported_to,
                    rate_number : req.body.rateNumber
                })
                await rate.save()
                const municipality = await municipalModel.findById(report.reported_to)
                municipality.rate.push(rate._id);
                await municipality.save();
                return res.status(200).json({
                    error: false,
                    message : "rated"
                })
            }
            return res.status(200).json({
                error: false,
                message : "You can't rate this report"
            })
        }
        return res.status(200).json({
            error: false,
            message : "No report found"
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}