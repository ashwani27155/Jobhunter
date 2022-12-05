const mongoose=require('mongoose');
const constant=require('../utils/constants')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    userType:{
        type:String,
        default:constant.userType.student
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    jobs: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Job"
    }
})
module.exports=mongoose.model('User',userSchema);