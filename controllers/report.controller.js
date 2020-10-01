const reportModel = require('../models/report.model');
const userModel = require('../models/user.model')
const municipalModel = require('../models/municipal.model')

exports.createReport = async (req,res)=>{
    try{
        var user = await userModel.findOne({email : req.body.userEmail})
        var municipal  = await municipalModel.findOne({name : req.body.municipalName})
        //console.log(req.file , req.body );
        const newReport = await new reportModel({
            name : req.body.name,
            description : req.body.description,
            photo_url :req.file.path,
            reported_by : user._id,
            reported_to : municipal._id,
        })
        await newReport.save()
        res.send(newReport)
        
    } catch(error){
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.viewAllReport = async (req,res)=>{
    try {
        const reports =  await reportModel.find({
        }).populate(['reported_by','reported_to']);
        if(reports){
            return res.json(reports)
        }
        throw new Error("No documents Retrived")
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}