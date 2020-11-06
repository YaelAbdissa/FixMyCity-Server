var mongoose=require('mongoose');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

const userModel = require('../models/user.model')
const { jwt_key } = require('../config/vars')

exports.login = async (req, res, next) => {
    try {
      const user = await userModel.findOne({
        email: req.body.email
      })
      if(user && await user.verifyPassword(req.body.password)){
        const user = await userModel.findOne({
          email: req.body.email
        }).select('-password')
        return res.json({
          ...user._doc,
          token: jwt.sign(
            {data: user}, 
            jwt_key,
            {expiresIn: '2h'},
            { algorithm: 'HS256' })
       });
      }
      
      return res.send({
        message : "Email/password not found"
      })  
      
        
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
  }

exports.changePassword = async (req, res, next) => {
  try {
    const oldPass = req.body.oldPass
    const newPass = req.body.newPass
    let user = await userModel.findById(req.user.data._id)
    if(user.verifyPassword(oldPass) ){
      user.password = newPass
      await user.save()
      return res.status(200).json(user)
    }
    throw new Error('Incorrec\'t password')
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message
  })
  }
}