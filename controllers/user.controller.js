const userModel = require('../models/user.model')

exports.viewAllUsers = async (req, res) => {

    try {
        const users = await userModel.paginate({});
        res.json(users)
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}

exports.viewUser = async (req, res) => {

    try {
        const user = await userModel.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}

exports.updateUser = async (req, res) => {

    try {
        // let user = await userModel.findById(req.params.id)
        let user =  await userModel.find({_id:req.user.data._id})
        if(user) {
            user = await userModel.updateOne({_id: req.user.data._id}, req.body)
            return res.json({message :"successfully updated"})
        }

        throw new Error('User dosen\'t exist')

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.removeUser = async (req, res) => {

    try {
        let user = await userModel.findById(req.params.id)
        if(user) {
            await userModel.remove({
                _id: user._id
            })
            return res.status(200).json({
                message: "Successfully deleted"
            })
        }

        res.status(200).json({
            message: 'user doesn\t exist',
    
        })

        
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error
        })
    }
}

exports.viewUserProfile = async(req,res) =>{
    try {

        const user =  await userModel.find({_id:req.user.data._id})
        if(user != null){
            return res.status(200).json(user)
        }
        res.status(200).json({
            message: "user not found"
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}

