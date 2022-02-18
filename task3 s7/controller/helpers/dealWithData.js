 //build-in
const fs = require("fs")

//my own
const writeDataToFile = (fileName, data) =>{
    try{
        if(!Array.isArray(data)) throw new Error("invalid data type")
        fs.writeFileSync(fileName, JSON.stringify(data))
        
       
    }
    catch(err){
        console.log(err.message)
    }
}
const readDataFromJSON = (fileName) =>{
    let data
    try{
        data = JSON.parse(fs.readFileSync(fileName))
    }
    catch(e){
        
        data = []
    }
    return data
}

// const timeFormatter = (d)=>{
//     return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}  ${d.getTime()}`
    
// }

module.exports = {
    writeDataToFile,
    readDataFromJSON,
   // timeFormatter
}