const express = require('express')
const app = express()
const { mongoose } = require('./db'); // { mongoose } Import mongoose from db file
const PORT = process.env.PORT||3000;
const db = require("./db")
const Person = require("./person")
const MenuItem = require("./menu")
require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.json())



const logRequest= (req,res,next) => {
    console.log(`[${new Date().toLocaleString() }] Request Made To ${req.originalUrl}`)
    next();
}
app.use(logRequest)

const  personRoutes = require("./personRoutes")
const menuRoutes = require("./MenuRoutes")
app.use("/person",personRoutes)
app.use("/menu",menuRoutes)


//app.use(logRequest)
app.get('/', (req, res) => {
    res.send('<h1>Welcome! HelloWorld</h1>')
})

app.listen(3000,()=>{
    console.log(`Server is running at port`)
})