const express =require("express");
const app=express();
const env=require("dotenv");
const cors=require('cors');
const morgan = require("morgan");
const connectDB = require("./config/db");


env.config()

// mongo db connection 
connectDB();
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1/auth',require("./routes/authRoutes"))


app.listen(process.env.PORT,()=>{
    console.log(`NODE SERVER STARTED SUCCESSFULLY IN ${process.env.DEV_MODE} ON PORT ${process.env.PORT}`);
});

