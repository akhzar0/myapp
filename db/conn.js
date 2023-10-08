const mongoose=require('mongoose');
const DB=process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log('conn success');
}).catch((err)=>{
    console.log('no conn');
})
