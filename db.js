const mongoose = require('mongoose');
require('dotenv').config()

//const mongoURL = 'mongodb://127.0.0.1:27017/hotel';
const mongoURL = process.env.mongoURL;

mongoose.connect(mongoURL,{
   // useNewUrlParser: true,
    // useUnifiedTopology: true
  });


const db = mongoose.connection;

db.on("connected",()=>{
    console.log("MongoDB connected")
})

db.on("error",(err)=>{
    console.log("MongoDB Error",err)
})

db.on("disconnected",()=>{
    console.log("MongoDB disconnected")
})

module.exports=db;