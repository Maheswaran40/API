const dotenv = require("dotenv");
dotenv.config(); // FIRST — load env variables


// without dotenv config connection string do not work
// so we get dotenv

const express = require("express");
const app = express();


const connectDB = require("./config/db");
connectDB(); //  ,calling Function

const cors=require("cors") // Cross Origin resource sharing
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// import routes
const route=require("./Routes/productRoute")
app.use("/api/products", route);



app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});


// install thunder client for api Chceking