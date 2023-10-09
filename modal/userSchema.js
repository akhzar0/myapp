const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})


// we are hashing password
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,6);
        this.cpassword= await bcrypt.hash(this.cpassword,6);
    }
    next();
});

// generating token
userSchema.methods.generateAuthToken=async function(){
    try{
       let token =jwt.sign({_id:this._id},process.env.SECRET_KEY);
       this.tokens=this.tokens.concat({token:token});
      await this.save();
      return token
    }
    catch(err){
        
    }
}
const User=mongoose.model('signup',userSchema);

module.exports =User;