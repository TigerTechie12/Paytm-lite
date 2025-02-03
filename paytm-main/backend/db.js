const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://shrey:dhonirainabazz@cluster0.0dbkboa.mongodb.net/")

const userSchema=new mongoose.schema({
    username:{type:String,
    required:true,
unique:true,
trim:true,
lowercase:true,
minLength:3,
maxLength:30}
,
password: {
    type:String,
required:true,
minLength:6
    },
firstName:{
    type:String,
    required:true,
    trim:true,
    maxLength:50
},
lastName:{
    type:String,
    required:true,
    trim:true,
    maxLength:50
}
})

const User=mongoose.model('Users',userSchema)
const bankSchema=new mongoose.Schema({userId:{
    type:mongoose.Schema.Types.ObjectId
,
ref:'User',
required:true},
balance:{type:Number,required:true}})
const Account=mongoose.model('Account',bankSchema)
module.exports={User,Account}