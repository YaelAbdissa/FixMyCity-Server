

const municipalityModel = require('../models/municipal.model')
const userModel = require('../models/user.model')

exports.refreshToken = async (req, res, next) => {
  var user = '';
    if(req.user.data.isMunicipal){
      user =  await municipalityModel.findById(req.user.data._id);
    }
    else{
      user =  await userModel.findById(req.user.data._id);
    }
    const updatedUser = await user.updateOne({firebase_reg_token : req.body.notificationtoken});
    return res.json({message :"sucessfully added fcm registration token"})
}