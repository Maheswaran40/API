const mongoose=require("mongoose")
const dataSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
})

const dataModal=mongoose.model("productsDetails",dataSchema)
module.exports=dataModal