require("../models/dbCon")

const express= require("express")
const app =express()

const hbs = require("hbs")
const path =require("path")

app.use(express.static(path.join(__dirname,"../frontend/")))
app.set('view engine',"hbs")
app.set("views",path.join(__dirname,"../frontend/views"))
hbs.registerPartials(path.join(__dirname,"../frontend/layouts"))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const customerRoutes=require("../routes/customer.routes")
app.use(customerRoutes)

app.get("*",(req,res)=>res.send('page not found'))
app.post('*', (req,res)=> res.send('page not found'))

module.exports=app