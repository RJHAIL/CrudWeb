import express from  "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/Auth.js";

const VerificationToken = async (req,res,next) =>
{
    try {
        const token =  req.cookies.token;
        if(!token)
        {
            res.status(303).json({success:false , message:"Unauthorised Please Login From Account First"});
            
        }
        const decoded = await jwt.decode(token,process.env.SECRET_KEY);
        const user = await  UserModel.findById(decoded.userId);
        if(!user)
            {
                res.status(303).json({success:false , message:"User Not Found!"});
                
            }
       //console.log(user);
        
       // console.log(decoded);
        req.userId = user._id;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).jon({success:false,message:"Internal server error!"});
        
    }
   
}



export default VerificationToken ;