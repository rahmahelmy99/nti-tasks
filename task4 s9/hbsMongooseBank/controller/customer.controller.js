const userModel=require("../models/customer.model")


 const addCustomer=async(req,res)=>{
    res.render('add', {pageTitle:"add customer"})
 }
 const addCustomerLogic=async(req,res)=>{
    try{
        const customer=new userModel(req.body)
        await customer.save()
        res.redirect('/')
      
    }
    catch(e){
        res.send(e.message)
    }    
    
}

const allCustomers=async(req,res)=>{
    try{
        const result=await userModel.find()    
        res.render("all",
        {
            pageTitle:"all Customers",
            allCustomers:result,
            isEmpty:result.length==0?true:false
        })
    }
    catch(e){
        res.send(e.message)
    }
}

const showSingle = async(req,res)=>{            
    try{
        const result= await userModel.findOne(req.params.accNum)
        res.render("single",{pageTitle:"all customers", customer:result})
    }
    catch(e){
        res.send(e.message)
    }
}
const editSingle = async(req,res)=>{
    try{
     const result= await userModel.findOne(req.params.accNum)
     res.render('edit', {pageTitle:"Edit data",customer:result}) 
    }
    catch(e){
        res.send(e.message)
    }    
}
const editSingleLogic = async(req,res)=>{
    try{
     await userModel.findOneAndUpdate(req.params.accNum,req.body)
     res.redirect('/') 
    }
    catch(e){
     res.send(e.message)
    }    
}
const delAll = async(req,res)=>{
    try{
        await userModel.deleteMany()
        res.redirect('/') 
    }
       catch(e){
        res.send(e.message)
     }    

}
const delUser = async(req,res)=>{
    try{
        await userModel.findOneAndDelete(req.params.accNum)
        res.redirect('/') 
    }
    catch(e){
        res.send(e.message)
    }    
}
 
const addTrans = async(req,res) => {
    res.render("addTrans", {pageTitle:"add Transaction "})
   }
const addTransLogic = async(req,res)=>{
    try{
       
        const result= await userModel.findOne(req.params.accNum)
        result.tarnsactions.push(req.body)
        result.save()
        res.redirect(`/single/${result._id}`)
    }
    catch(e){
        res.send(e.message)
    }
}

module.exports={
    allCustomers,
    addCustomer,
    addCustomerLogic,
    showSingle,
    editSingle,
    editSingleLogic,
    delAll,
    delUser,
    addTrans,
    addTransLogic,
   
 
}