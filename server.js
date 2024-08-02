const express = require('express')
const app = express()
const { mongoose } = require('./db'); // { mongoose } Import mongoose from db file
const PORT = process.env.PORT||3000;
const db = require("./db")

const MenuItem = require("./menu")
require('dotenv').config()
const passport = require("./auth")

const bodyParser = require('body-parser')
app.use(bodyParser.json())


//Middleware Function
const logRequest= (req,res,next) => {
    console.log(`[${new Date().toLocaleString() }] Request Made To ${req.originalUrl}`)
    next();
}
app.use(logRequest)

app.use(passport.initialize())

const LocalAuthMiddleware = passport.authenticate("local",{session:false})


app.get('/',  (req, res) => {
    res.send('<h1>Welcome! HelloWorld</h1>')
})

const  personRoutes = require("./personRoutes")
const menuRoutes = require("./MenuRoutes")
app.use("/person",LocalAuthMiddleware,personRoutes)
app.use("/menu",LocalAuthMiddleware,menuRoutes)



app.listen(3000,()=>{
    console.log(`Server is running at port`)
})