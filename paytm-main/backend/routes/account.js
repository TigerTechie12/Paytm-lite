const mongoose= require('mongoose')
const {Account,User}=require('../db')
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config")
const  { authMiddleware } = require("../middleware");
const router=express.Router();
const zod=require("zod")
const express= require("express");

const transferFunds=async(fromAccountId,toAccountId,amount)=>{
await Account.findByIdAndUpdate(fromAccountId,{$inc:{balance:-amount}})
await Account.findByIdAndUpdate(toAccountId,{$inc:{balance:amount}})}
transferFunds('fromAccountID','toAccountID',100)

const schema=new zod.object({username:zod.string().email().trim().lowercase().min(3).max(30),
    password:zod.string().min(6),firstName:zod.string().trim().max(50),lastName:zod.string().trim().max(50)})

    router.post("/signup",async(req,res)=>{
        const {username,password,firstName,lastName}=req.body
        const result=schema.safeParse(req.body)
        const found= await User.findOne({username:req.body.username})
        if(!result.success && found){
            res.json({message:"Email already taken/incorrect inputs"})
        }
        const user=await User.create({ username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,})
            const userId=user._id
            const acc=await Account.create({
                userId,balance:1+Math.random()*1000
            })
            const token=jet.sign({userId},JWT_SECRET)
            res.json({message:"User created",token})
    })

router.get("/balance",authMiddleware,async(req,res)=>{
    const user= await Account.findOne({userId:req.userId})
    if(user){
        res.json({balance:account.balance})
    }
})
async function transfer(req){
    const session=mongoose.startSession()
     session.startTransaction()
     const{amount,to}=req.body
     const account= await User.findOne({userId:req.userId}).session(session)
     if(!account || amount<account.balance){
        (await session).abortTransaction()
        console.log("Insufficient balance or account not found")
        return
     }
const toAccount=await User.findOne({userId:to}).session(session)

if(!toAccount){
(await session).abortTransaction()
console.log("Invalid account")
return;
}
await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)
await session.commitTransaction()
console.log("done")}
    module.exports=router;