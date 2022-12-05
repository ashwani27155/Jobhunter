/** this file contain the logic for signup and signin */
const mongoose=require('mongoose');
const User=require('../models/user.model');
const bcrypt=require('bcrypt');
const jsonwebtoken=require('jsonwebtoken');
const secret=require('../configs/auth.config');
//logic for signup
exports.signup= async(req,res)=>{
    const userObject={
        name:req.body.name,
        userId:req.body.userId,
        password:bcrypt.hashSync(req.body.password,8),
        email:req.body.email,
        userType:req.body.userType
    }
    try{
        const createdUser= await User.create(userObject)
        console.log('user created successfully',createdUser);
        const userCreationResponse={
            name:createdUser.name,
            userId:createdUser.userId,
            email:createdUser.email,
            userType:createdUser.userType,
            createdAt:createdUser.createdAt,
            updatedAt:createdUser.updatedAt
        }
        //return user created response
        res.status(200).send(userCreationResponse)
    }catch(error){
        console.log(error.message);
        res.status(500).send({
            message:"Some internal error while creating new user"
        })
    }
}
//logic for signin
exports.signin=(req,res)=>{
    try{
        const user=User.findOne({userId:req.body.userId})
    }catch(err){
        console.log("Some issue while fetching the data",err.message);
        res.status(500).send({
            message:"Some internal error while fetching the details"
        })
    }
    if(!user){
        return res.status(200).send({
            message:"userId does not exit"
        })
    }
    const isValid=bcrypt.compareSync(req.body.password , user.password);
    if(!isValid){
        return res.status(500).send({
            message:"Invalid password"
        })
    }
    //if every thing is good then generate the accesss token
    const token=jsonwebtoken.hashSync({id:user.userId},secret.secretKey,{expiresIn:600})
    //send back response
    res.status(200).send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        userStatus:user.userStatus,
        accessToken:token
    })
}