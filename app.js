const dotenv=require('dotenv');
const express=require('express');
const app=express();
dotenv.config({path:'./config.env'});
const path=require('path');

// link conn file
require('./db/conn');
app.use(express.json());

// link router file
app.use(require('./router/auth'));

// http port
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    
});
