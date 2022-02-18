const dealWithData = require("./helpers/dealWithData")
// const uniq = require("uniq")
const router = require("../routes/task.routes")
const { all } = require("../routes/task.routes")


const alltasks = (req,res)=>{
    const alltasks = dealWithData.readDataFromJSON('./models/data.json')
    res.render("all",
    {
        pageTitle:"all tasks",
        alltasks,
        isEmpty: alltasks.length==0? true: false
    })
}
//addtask************
const addtask = (req, res)=>{
    res.render('add', {pageTitle:"add task(post method)"})
}


const addtaskLogic = (req,res)=>{
    try{
    const alltasks = dealWithData.readDataFromJSON('./models/data.json')
    alltasks.forEach(task => {
    if(task=> task.title == req.params.title ) throw new Error ("title is already exist")
    alltasks.push({
        title:req.query.title,
        name: req.query.name,
    })
    
    dealWithData.writeDataToFile('./models/data.json', alltasks)
    res.redirect('/')
})    
}catch(e){
    res.send(e.message)
}

}


const showSingle = (req,res)=>{
    const alltasks = dealWithData.readDataFromJSON('./models/data.json')
    const task = alltasks.find(task=> task.title === req.params.title )
    res.render('single', {
        pageTitle:"single data",
        task
    })
}

//edit*************
const editSingle = (req, res)=>{
    const alltasks = dealWithData.readDataFromJSON('./models/data.json')
    const user = alltasks.find(task=> task.title == req.params.title )
    res.render('edit', {pageTitle:"Edit data",title:user})
}
const editSingleLogic=(req,res)=>{
    const alltasks = dealWithData.readDataFromJSON('./models/data.json')
    const usertitle = alltasks.findIndex(task=> task.title == req.params.title )
    alltasks[usertitle].title=req.body.title
    alltasks[usertitle].name=req.body.name
    dealWithData.writeDataToFile('./models/data.json', alltasks)
    res.redirect("/")    
}



const delTask=(req,res)=>{
    const alltasks = dealWithData.readDataFromJSON('./models/data.json')
    const tasks = alltasks.filter(task=> task.title != req.params.title )
    dealWithData.writeDataToFile('./models/data.json', tasks)
    res.redirect('/')
   
}
const delAll = (req,res)=>{
    dealWithData.writeDataToFile('./models/data.json', [])
    res.redirect("/")
}

module.exports={
    alltasks,
    addtask,
    addtaskLogic,
    showSingle,
    editSingle,
    editSingleLogic,
    delTask,
    delAll
    


}