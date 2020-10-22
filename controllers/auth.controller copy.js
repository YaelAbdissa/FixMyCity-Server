require('dotenv').config();
var jwt = require('jsonwebtoken');
const nodeMailer = require("nodemailer");
var emailCheck = require('email-check');

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
        }).populate({ path: 'roles', populate: {path: 'permissions'} })
        if(user && await user.verifyPassword(req.body.password)){
            req.session.user = user;
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
        const isValid =await emailCheck(req.body.email)
        if(isValid){
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
                    <h2>Please click on given button to activate your account</h2>
                    <form action="http://localhost:${process.env.PORT}/auth/activate/" method="POST">

                    <input id="title" name="token" type="hidden">
                    <input type="submit" value="Click Button" />
                    </form>

                    <a href="http://localhost:${process.env.PORT}/auth/activationLink/${token}">click link</a>
               `
            }
            transporter.sendMail(mailOption , function (err, data) {
                if(err){
                    throw new Error("something went wrong")
                } else {
                    res.status(200).send("Email sent successfully check your email")
                }
            
            })
        }
        else{
            throw new Error("email does not exists")
        }
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}
exports.activate = async (req, res)=>{
    try{
        const token = req.body.token;
        console.log(token)
        if(!token){
            throw new Error("Something went wrong")
        }
        
        jwt.verify(token, jwt_key, { algorithm: 'HS256' }, async (err, decoded)=> {
            if(err){
                throw new Error("Incorrect or expired links")
            }
            //console.log(decoded.data)

            // const roles = await roleModel.findOne({
            //     name: "user"
            // })
            console.log(decoded)
            // const newUser = await new userModel({
            //     first_name : decoded.data.first_name,
            //     last_name : decoded.data.last_name,
            //     email : decoded.data.email,
            //     password : decoded.data.password,
            //     roles : roles._id,
            // })
            
            // await newUser.save()
            // res.status(200).json({
            //     newUser
            // })

        });
        
    }catch(err){
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.forgetPassword = async (req, res) => {

    try {
        let user = await userModel.findOne({
            email: req.body.email
        });
        if(!user){
            throw new Error("User doesn't exist")
        }
        var resetCode = Math.floor(1000 + Math.random() * 9000);
            let mailOption = {
                from : "fixmycity3@gmail.com",
                to : req.body.email,
                subject : " Password Reset Code",
               html : `
                    <h2>Please enter on code below to reset your password</h2>
                    <h2>${resetCode}</h2>
               `
            }
            await user.updateOne({reset_link : resetCode});
            transporter.sendMail(mailOption , function (err, data) {
                if(err){
                    throw new Error("something went wrong")
                } else {
                    res.status(200).send("password reset link is sent to your email sucessfully...now you can reset your password")
                }
            })
        
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}

exports.activationLink = (req,res) =>{
    const activationLink = req.params.token;

    return res.status(200).json({
        "activationLink" : activationLink
    })

}
exports.resetPassword = async (req, res) => {
    const {resetLink , newPass} = req.body
    console.log("bub" , resetLink ,newPass)
    try {
        if(resetLink){
            jwt.verify(resetLink, jwt_key, { algorithm: 'HS256' }, async (err, decoded)=> {
                if(err){
                    throw new Error("Incorrect or expired links")
                }
                const user = await userModel.findOne({
                    reset_link: resetLink
                });

                if(!user){
                    throw new Error("User with this link doesn't exist ")
                }
                user.password = newPass
                user.reset_link = undefined
                await user.save()
                res.status(200).json({
                    user
                })
            })
            
        }
        else{
            throw new Error("Reset Link can't be null")
        }
        
        

    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}


exports.logout = async (req, res) => {

    try {
        req.session.destroy((err)=>{
            if(err){
                throw new Error("Something went wrong")
            }
            res.send("your logged out")
        });

    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}