require('dotenv').config();
var jwt = require('jsonwebtoken');
const nodeMailer = require("nodemailer");

const { jwt_key } = require('../config/vars')
const userModel = require('../models/user.model')
const roleModel = require('../models/role.model')

let transporter = nodeMailer.createTransport({
    service : 'gmail',
    auth : {
        user :  "fixmycity3@gmail.com",
        pass : "fixmycity123."
    }
})



exports.login = async (req, res) => {

    try {
        const user = await userModel.findOne({
            email: req.body.email
        }).populate({ path: 'roles', populate: {path: 'permissions'} });

        if(user && await user.verifyPassword(req.body.password)){
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

       throw new Error("Email/password not found")

    } catch (error) {
        
        res.json({
            error: true,
            message: error.message
        })
    }
    
}

exports.signup = async (req, res) => {

    try {
        const user = await userModel.findOne({
            email: req.body.email
        })
        if(user){
            throw new Error("User already Exists")
        }
        const token = jwt.sign({data: req.body}, jwt_key, { algorithm: 'HS256' })
        let mailOption = {
            from : "fixmycity3@gmail.com",
            to : req.body.email,
            subject : " Account Activation Link",
           html : `
                <h2>Please click on given link to activate your account</h2>
                <form action="http://localhost:${process.env.PORT}/auth/activate/${token}" method="POST">
                <input id="title" name="token" type="hidden" required>
                <input type="submit" value="Click Button" />
                </form>
           `
        }
        transporter.sendMail(mailOption , function (err, data) {
            if(err){
                throw new Error(err)
            } else {
                console.log("Email sent");
            }
        
        })
    
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}
exports.activate = async (req, res)=>{
    try{
        const token = req.params.token;
        console.log(token)
        if(!token){
            throw new Error("Something went wrong")
        }
        
        jwt.verify(token, jwt_key, { algorithm: 'HS256' }, async (err, decoded)=> {
            if(err){
                throw new Error("Incorrect or expired links")
            }
            console.log(decoded.data)

            const roles = await roleModel.findOne({
                name: "user"
            })
       
            const newUser = await new userModel({
                first_name : decoded.data.first_name,
                last_name : decoded.data.last_name,
                email : decoded.data.email,
                password : decoded.data.password,
                roles : roles._id,
            })
            
            await newUser.save()
            res.status(200).json({
                newUser
            })

        });
        
    }catch(err){

    }
}

exports.forgetPassword = async (req, res) => {

    try {
        const user = await userModel.findOne({
            email: req.body.email
        });
        if(!user){
            throw new Error("User doesn't exist")
        }
        
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}
exports.resetPassword = async (req, res) => {

    try {
        const email = await userModel.findOne({
            email: req.body.email
        });
        

    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}