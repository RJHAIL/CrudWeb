import mongoose from "mongoose";

const UserShema = new mongoose.Schema({

    userName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
},{timestamps:true}
)

const UserModel = mongoose.model("Users",UserShema);

export default  UserModel;