var mongoose=require('mongoose');

const reportModel = require('../models/report.model');
const municipalModel = require('../models/municipal.model')
const userModel = require('../models/user.model')

exports.createReport = async (req,res)=>{
    try{
        var municipal  = await municipalModel.findOne({name : req.body.municipal})
        const newReport = await new reportModel({
            name : req.body.name,
            description : req.body.description,
            photo_url :req.file.path,
            reported_by : mongoose.Types.ObjectId(req.body.user_id),
            reported_to : mongoose.Types.ObjectId(municipal._id),
        })
        await newReport.save()
        return res.status(200).send(newReport)
        
        
    } catch(err){
        console.error(err)
        res.status(400).json({
            error: true,
            message: err.message,
    
        })
    }
}

exports.viewAllReport = async (req,res)=>{
    try {
        const option = {
            sort :  { 'created_at' : -1 }
        }
        const reports =  await reportModel.paginate({},option)
        if(reports){
            return res.status(200).json(reports)
        }
        return res.status(401).json({
            error: false,
            message : "No documents Retrived"
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.viewReportById = async (req,res)=>{
    try {
        const reports =  await reportModel.find({
            _id : req.params.id
        }).populate(['reported_by','reported_to'])
        if(reports.length != 0){
            return res.status(200).json(reports)
        }
        throw new Error(" report not found")
      
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.viewMyReport = async (req,res)=>{
    try {
        const reports =  await reportModel.find({
            reported_by: mongoose.Types.ObjectId(req.user.data._id)
        })
        if(reports){
            return res.status(200).json(reports)
        }
        return res.status(401).json({
            error: false,
            message : "No documents Retrived"
        })
        
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}


exports.resolveReport = async (req,res)=>{
    try {
        const municipal_id = req.user.data._id
        const report =  await reportModel.findOne({
            _id : req.params.id
        })
        if(report){
            if(req.user.data._id == report.reported_to){
                if(report.isResolved == true){
                    return res.status(200).json({
                        error: false,
                        message: 'the report is already resolved'
                    })
                }
                const newReport = {
                    name : report.name,
                    description : report.description,
                    photo_url :report.photo_url,
                    isResolved :true
                }
                await reportModel.updateOne({_id:report._id}, newReport);
                const option = {
                    sort :  { 'updated_at' : -1 }
                }
               return res.json(await reportModel.paginate({reported_to : mongoose.Types.ObjectId(municipal_id)},option))
            }
            throw new Error('You can\'t Resolve this Issue')
        }

        throw new Error('Report dosen\'t exist')
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}

exports.forMunicipal = async (req,res)=>{

    try {
        const municipal_id = req.body.municipal_id

        const reports =  await reportModel.find({
            reported_to : mongoose.Types.ObjectId(municipal_id)
        })
        if(reports.length != 0){

            return res.status(200).json(reports)
        }
        
        return res.status(200).json({
            error: false,
            message: "No Data to retrieve"
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    

}

exports.removeReport = async (req, res) => {
    try {
        let report = await reportModel.findById(req.params.id)
        if(report) {
            await reportModel.remove({
                _id: report._id
            })
            return res.status(200).json({
                message: "Successfully deleted"
            })
        }
        res.status(200).json({
            message: 'municreportipal doesn\t exist',
    
        })

    } catch (error) {
        res.status(400).json({
            error: true,
            message: err.message,
    
        })
    }
}