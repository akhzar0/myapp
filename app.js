const dotenv=require('dotenv');
const express=require('express');
const app=express();
dotenv.config({path:'./config.env'});
const PORT=process.env.PORT || 5000;

// link conn file
require('./db/conn');
app.use(express.json());

// link router file
app.use(require('./router/auth'));

// http port
app.listen(PORT,()=>{
    console.log(`running ${PORT}`);
});
