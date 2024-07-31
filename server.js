const express = require('express')
const app = express()
const { mongoose } = require('./db'); // Import mongoose from db file
const PORT = process.env.PORT||3000;
const db = require("./db")
const Person = require("./person")
require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.json())


const MenuItem = require("./menu")

const  personRoutes = require("./personRoutes")
const menuRoutes = require("./MenuRoutes")
app.use("/person",personRoutes)
app.use("/menu",menuRoutes)


app.get('/', (req, res) => {
    res.send('<h1>HelloWorld</h1>')
})





app.listen(PORT,()=>{
    console.log(`Server is running at port`)
})