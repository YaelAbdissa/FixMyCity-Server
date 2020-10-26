var mongoose=require('mongoose');
var jwt = require('jsonwebtoken');

const userModel = require('../models/user.model')
const { jwt_key } = require('../config/vars')

exports.login = async (req, res, next) => {
    try {
      const user = await userModel.findOne({
        email: req.body.email
      }).populate({ path: 'roles', populate: {path: 'permissions'} });
      if(user && user.verifyPassword(req.body.password)){
          console.log(user)
          if(user._doc.roles[0].name == "admin" ){
            
            let permissions =  user._doc.roles.reduce((prev, next) => {
                return [...prev, ...next.permissions.map(permission => permission.name)]
            },[])
            user._doc.permissions = Array.from(new Set([...user._doc.permissions.map(v => v.name), ...permissions ]))
    
            user._doc.roles = user._doc.roles.map(role => role.name)
            return res.json({
                ...user._doc,
                token: jwt.sign({data: user._doc}, jwt_key, { algorithm: 'HS256' })
             });
        }

        
    
        return res.status(401).json({
            error: false,
            message : "You aren't Authorized"
        })  
      }
      throw new Error("Email/password not found")
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