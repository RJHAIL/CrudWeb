import UserModel from "../models/Auth.js";
import bcrypt from"bcryptjs";
import jwt from "jsonwebtoken"

const Register = async(req,res)=>
{
    try {

        const {userName,email,password} = req.body;
        if(!email || !userName || !password ) 
        {
            res.status(303).json({success:false,message:"All Fields are required!"})
        }
   const exitingUser = await UserModel.findOne({email});


   if(exitingUser)
   {
    return res.status(303).json({ success:false,message:"User already exist Please Login!"});
   }
   
   const hasepassword = await bcrypt.hashSync(password,10);
   const NewUser = new UserModel({
    userName, email,password:hasepassword
   })
   NewUser.save();
   
   res.status(200).json({success:true , message:"User Register Succesfully",User:NewUser});

    }
     catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal Server Error!"});
        
    }
   
}

const Login = async (req,res) =>
{
    try {
        const {email,password} = req.body;
   
   const FindUser = await  UserModel.findOne({email});

   if(!FindUser)
   {
    res.status(404).json({success:true , message:"User Not Found please Register!"});
   }

   const comparePassword = await bcrypt.compare(password,FindUser.password);

   if(!comparePassword)
   {
    res.status(404).json({success:true , message:"Invalid Password!"});
   }
     
   const token = jwt.sign({userId:FindUser._id},process.env.SECRET_KEY,{expiresIn:"3d"})

    res.cookie("token",token,{
        HttpOnly:true,
        secure:false,
        maxAge:3*24*3600*1000
    });

   res.status(200).json({success:true,message:"Login Successfully!",user:FindUser,token})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal Server Error!"});
        
    }
   
   
}

const Logout = async (req,res)=>
{
    try {
          res.clearCookie('token');
          res.status(200).json({success:true,message:"Logout Successfully!"})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal Server Error!"});
    }
}



export { Register,Login,Logout};