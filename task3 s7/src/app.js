const express =require("express")
const app =express()
 
const hbs= require("hbs")
const path= require("path")
hbs.registerPartials( path.join(__dirname, "../frontend/layouts"))
app.use(express.static(path.join(__dirname,"../frontend/views")))
app.set('view engine', 'hbs')
app.set( 'views', path.join(__dirname, "../frontend/views"))

app.use(express.urlencoded({extended:true}))

const taskRoutes = require('../routes/task.routes');
app.use(taskRoutes)
 
module.exports=app
