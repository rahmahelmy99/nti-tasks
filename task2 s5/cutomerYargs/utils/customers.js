const chalk = require("chalk")
const dealWithData=require("./dealWithData")
const customerData=require("./validation")
const uniqid=require("uniqid")


const addCustomer=(args)=>{
    let errors = []
    let customer={}
    try{
        customerData.forEach(d => {
            if(d.invalid(args[d.ele])) errors.push(d.invalid(args[d.ele]))
            if(!d.default)return customer[d.ele]=args[d.ele]
            customer[d.ele] = d.default
        })
        if(errors.length>0) throw new Error(errors)
        const customers = dealWithData.readDataFromJSON("./db/data.json")
        customers.length == 0 ? customer.id=1: customer.id = customers[customers.length-1].id+1
        customers.push(customer)
        dealWithData.writeDataToFile("./db/data.json", customers)    

    }
    catch(e){console.log(e.message)}
}
/*
const addAccNum = (data)=>{
    try{
        const customers = dealWithData.readDataFromJSON("./db/data.json")
       
        let customerIndex = customers.findIndex(u=> u.id==data.id)
        if(customerIndex==-1) throw new Error("user not found")
        else customers[customerIndex].accNum.push({accNum:uniqid()})
        dealWithData.writeDataToFile('./db/data.json', customers)
        console.log(chalk.bgWhite.gray("data added"));
    
}
    catch(e){
        console.log(e.message)
    }
}
*/
const showCustomer=(data )=>{
    try{
        const customers = dealWithData.readDataFromJSON("./db/data.json")
        let indexCustomer = customers.findIndex(u=> u.id==data.id)
        if(indexCustomer==-1) throw new Error("customer not found")
        else console.log(customers[indexCustomer])
    }catch(e){
        console.log(e.message)
    }
 

}

const showAll =()=>{
    const customers = dealWithData.readDataFromJSON("./db/data.json")
    customers.forEach(customer=>{
        let u = `id => ${customer.id}\n`
        customerData.forEach(d=> u+=d.ele+"=>"+customer[d.ele] + '\n')
        console.log(u)
    })
}
const addTransaction = (data)=>{
    try{
        const customers = dealWithData.readDataFromJSON("./db/data.json")
       
        let customerIndex = customers.findIndex(u=> u.id==data.id)
        if(customerIndex==-1) throw new Error("user not found")
        else customers[customerIndex].transaction.push(
        {
            transId:Date.now(),
            transType:data.transType,
            transDetails:data.transDetails
        })
        
        dealWithData.writeDataToFile('./db/data.json', customers)
        console.log(chalk.bgWhite.gray("data added"));
    
}
    catch(e){
        console.log(e.message)
    }
}



const deleteCustomer=(data)=>{
    try{
        const customers = dealWithData.readDataFromJSON("./db/data.json")
       
        let customerIndex = customers.findIndex(u=> u.id==data.id)
        if(customerIndex==-1) throw new Error("user not found")
        customers.splice(customerIndex,1)
        dealWithData.writeDataToFile('./db/data.json', customers)
        console.log(chalk.bgWhite.gray("data deleted"));
    
}
    catch(e){
        console.log(e.message)
    }
 

}

const deleteAll=(data)=>{
    dealWithData.writeDataToFile("./db/data.json",[])
    console.log("All data deleted")    
}

module.exports= {addCustomer,addAccNum,showCustomer,showAll,addTransaction ,deleteCustomer,deleteAll}
