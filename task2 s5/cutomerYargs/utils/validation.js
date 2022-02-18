const dealWithData=require("./dealWithData")
const validator=require("validator")
const uniqid=require("uniqid")

const customerData=[
    {
        ele:"accNum",
        default:{},//uniqid()
        invalid:(data)=>false
    },

    {
        ele:"name",
        default:false,
        invalid: function (data) {
            if (data.length < 3) return "name must be more than 3 chars"
            else return false
        }
    },

    {
        ele:"balance",
        default:false,
        invalid: (data) => data<1000 ? "invalid balance" : false
        
    },

    {
        ele:"transaction",
        default:[],
        invalid:(data)=>false
    }

    ]
module.exports = customerData