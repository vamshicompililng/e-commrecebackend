const mongoose=require("mongoose");

/**
 * Schema consists :
 * name:
 * userid:
 * password:
 * email:
 * usertype:
 */
const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minlength:10,
        unique:true
    },
    userType:{
        type:String,
        default:"CUSTOMER",
        enum:["CUSTOMER","ADMIN"] // fixed 
    }

},{timestamps:true,versionKey:false})

module.exports=mongoose.model("User",userSchema);// this will create a collection in the db with the name as the "User"
