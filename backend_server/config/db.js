const mongoose=require("mongoose"); //for mongo access
//connecting mongobd through connection string in env file
// create function for db connection
const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(console.log("DB connected"))
    .catch((err)=>console.log("DB not connected",err))
}
module.exports=connectDB // exporting this fun to app.js or server.js to access