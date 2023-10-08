const express=require('express');
// const jwt =require("jsonwebtoken");
const bcrypt=require('bcrypt');
const router=express.Router();
const User=require('../modal/userSchema');
const authenticate=require("../middlewear/authenticate");
const cookiParser=require('cookie-parser');
require('../db/conn');
router.get('/',(req,res)=>{
    res.send('router')
})
// SignUp
router.post('/signup',async(req,res)=>{
   const {name,email,password,cpassword}=req.body;

    if(!name || !email || !password || !cpassword){
       return res.status(422).json({err:"Please Fill All Fildes!"});
   }
   try{
    const userExist = await User.findOne({email:email})
    if (userExist){
        return res.status(422).json({err:"Email Already Exist!"});
    }
    else if(password!=cpassword){
        return res.status(422).json({err:"Password Not Match!"});
    }
    else{
        const user= new User({name,email,password,cpassword});
        await user.save();
        res.status(201).json({message:"User Successfully"});
    }}
    catch(err){
      console.log(err);
    }
})

// login route

router.post('/signin',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please Fill Data"})
        }
        const userLogin= await User.findOne({email:email});
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);
            const token = await userLogin.generateAuthToken();
            res.cookie("jwttoken",token,{
                expires:new Date(Date.now()+ 3600000),
                httpOnly : true
            })
            if(!isMatch){
               res.status(400).json({error:"Invalid Password"}) 
            }
            else{
                res.json({message:"Signin Successful"})
            }
        }
        else{
           res.status(400).json({message:"Invalid Email"})
        }
      
    }
    catch(err){
        console.log(err);
    }
})

router.use(cookiParser());
router.get('/portfolio',authenticate,(req,res)=>{
    console.log('my port');
    res.send(req.rootUser);
});

router.get('/logout',(req,res)=>{
    res.clearCookie('jwttoken',{path:'/'})
    res.status(200).send(req.rootUser);
});
module.exports=router;