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
        const userfortoken = _.pick(user,['username','isAdmin','_id','email'])
        return res.json({
          ...user._doc,
          token: jwt.sign(
            {data: userfortoken}, 
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
    const oldPass = req.body.password
    const newPass = req.body.newPassword
    let user = await userModel.findById(mongoose.Types.ObjectId(req.body.id))
    if(oldPass == user.password ){
      const newUser = {
        username : user.username,
        email : user.email,
        password :newPass,
        roles :user.roles
   
      }
      await reportModel.updateOne({_id:user._id}, newUser);
      return res.json({user})
    }
    throw new Error('Incorrec\'t password')
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message
  })
  }
}