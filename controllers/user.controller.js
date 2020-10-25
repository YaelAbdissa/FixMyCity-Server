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
        let user = await userModel.findById(req.params.id)
        if(user) {
            user = await userModel.updateOne({_id: user._id}, req.body)
            return res.json(user)
        }

        throw new Error('User dosen\'t exist')
       

        
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error
        })
    }
}

