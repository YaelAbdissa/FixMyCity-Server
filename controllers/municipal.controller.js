var jwt = require('jsonwebtoken');
var _ = require('lodash');

const municipalityModel = require('../models/municipal.model')
const roleModel = require('../models/role.model')

const { jwt_key } = require('../config/vars')
exports.getAllMunicipality = async(req,res) =>{
    const municipals = await municipalityModel.find({})
    res.status(200).json(municipals)
}

exports.getMunicipalityById = async(req,res) =>{
    try {
        const municipal =  await municipalityModel.findById(req.params.id)
        if(municipal != null){
            res.status(200).json(municipal)
        }
        res.status(200).json({
            message: "municipality not found"
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}

exports.addMunicipal = async(req,res)=>{
    try {
        var municipal  = await municipalityModel.findOne({name : req.body.name})
        if(municipal){
            throw new Error("Muncipal already exists")
        }
        const roles = await roleModel.findOne({
            name: "municipal"
        })
        const newMunicipal = new municipalityModel({
            name :req.body.name,
            password : req.body.password,
            username: req.body.username,
            roles : roles._id,

        })
        await newMunicipal.save()
        res.status(200).json(
            newMunicipal
        )
    } catch (error) {
        res.status(400).json({
            error: true,
            message: err.message,
    
        })
    }
}

exports.login = async (req,res)=>{
    try {
     const {username ,password} = req.body
        const municipal = await municipalityModel.findOne({
            username : username
        })
        if(municipal && municipal.verifyPassword(password)){
            const municipalfortoken = _.pick(municipal,['username','name','isMunicipal','_id'])
            return res.json({
                ...municipal._doc,
                token: jwt.sign({data: municipalfortoken}, jwt_key, { algorithm: 'HS256' })
            });
        }
        throw new Error("Email/password not found")
    } catch (err) {
        res.status(400).json({
            error: true,
            message: err.message,
    
        })
    }
}

exports.remove = async (req, res) => {
    try {
        let municipal = await municipalityModel.findById(req.params.id)
        if(municipal) {
            await municipalityModel.remove({
                _id: municipal._id
            })
            return res.status(200).json({
                message: "Successfully deleted"
            })
        }
        res.status(200).json({
            message: 'municipal doesn\t exist',
    
        })

    } catch (error) {
        res.status(400).json({
            error: true,
            message: err.message,
    
        })
    }
}

exports.update = async (req, res) => {
    try {
        let municipal = await municipalityModel.find({
            _id:req.params.id
        })
        if(municipal.length != 0) {
            await municipalityModel.updateOne({_id: req.params.id}, req.body)
            return res.status(200).json(await municipalityModel.find({}))
        }
        throw new Error(" Unknown Municipal")

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message,
    
        })
    }
}

exports.viewMunicipalityProfile = async(req,res) =>{
    try {

        const municipal =  await municipalityModel.findById(req.user.data._id)
        if(municipal != null){
            res.status(200).json(municipal)
        }
        res.status(200).json({
            message: "municipality not found"
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}