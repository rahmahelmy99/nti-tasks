const mongoose=require("mongoose")
const schema = new mongoose.Schema({ _id: Number }, { versionKey: false });
const Model = mongoose.model('MyModel', schema);
const customer =mongoose.model("customer",{

    accNum:{
        type:Number,
        trim:true,
        minLength:"6",
        unique:true,
        required:true,
    },
    name:{
        type:String,
        trim:true,
        minLength:"3",
        maxLength:"8",
        required:true,
    },
    balance:{
        type:Number,
        required:true,
        trim:true,
        min :100,
        max:10000,
    },
    tarnsactions:[{
        trans:{
            date:{lastActiveAt: Date  },
            type:{enum:["add transaction","withdraw"]}
        }
    }],

})
module.exports= customer