/**
 * this will be the starting file of the project if we run this then entire project gets run
 */
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const server_import=require("./configs/server.configs");
const serverConfigs = require("./configs/server.configs");
const db_config=require("./configs/database.configs");
const user_model=require("./models/user.model");
const bcryptjs=require("bcryptjs");
/**
 * create the admin at the starting of the application 
 * if not already present
 */
// connection with mongodb 
mongoose.connect(db_config.DB_URL);
const db=mongoose.connection;
db.on("error",()=>{
    console.log("error while connecting to database")
})
db.once("open",()=>{
    console.log("connect to mongodb");
    init();
})
async function init(){
    try{
        const user= await user_model.findOne({userId:"admin"})
        if(user){
            console.log("admin is already present");
            return;
        }
    }catch(err){
        console.log("error while creating data",err);
    }
    
   try{
    user=await user_model.create({
        name:"vamshi",
        userId:"admin",
        email:"vamshi123@gmail.com",
        userType:"ADMIN",
        password: bcryptjs.hashSync("welcome1",8)
    })
    console.log("Admin created",user)
   }
   catch(err){
    console.log("error while create admin",err);
   }

}

/*
 *  staring the server
 */
app.listen(serverConfigs.PORT,()=>{  // port:8080
    console.log("Server Started at the port num :",serverConfigs.PORT);
})
