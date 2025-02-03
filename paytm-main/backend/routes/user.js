const express= require("express");
const userRouter=require("./user")
const router=express.Router();
const zod=require("zod")
const {User}=require("../db")
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config")
const  { authMiddleware } = require("../middleware");

router.use("/user",userRouter);
const schema=new zod.object({username:zod.string().email().trim().lowercase().min(3).max(30),
    password:zod.string().min(6),firstName:zod.string().trim().max(50),lastName:zod.string().trim().max(50)})
router.post('/signup',async(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    const firstName=req.body.firstName
    const lastName=req.body.lastName
    const result=schema.safeParse(req.body)
    const find=await User.findOne({username:req.body.username})
    if(result.success && !find ){
        const user=await User.create({  username:req.body.username,
             password:req.body.password,
             firstName:req.body.firstName,
             lastName:req.body.lastName,})
        const userId=user._id;
        const token=jwt.sign({userId:user._id},JWT_SECRET)
        res.status(200).json({message:"User created successfully",token:token})
    }
    else{res.status(411).json("Email already taken/ Incorrect inputs")}
})
const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
  });
router.post("/signin",async(req,res)=>{
    const signinbody=signinSchema.safeParse(req.body)
const username=req.body.username;
const password=req.body.password;
const user=await User.findOne({username:req.body.username})
if(user && signinbody.success){
 userId:user._id
    const token=jwt.sign({userId:user._id},JWT_SECRET)
    res.status(200).json({token:token})
}
else{res.json("Error while logging in")}
})


const updateSchema=zod.object({password:zod.string().min(6).optional(),firstName:zod.string().lowercase().max(50).optional(),lastName:zod.string().lowercase().max(50).optional()})
router.put('/',async(req,res)=>{
    const password=req.body.password
    const firstName=req.body.firstName
    const lastName=req.body.lastName
    const schemaCheck=updateSchema.safeParse({password:req.body.password,firstName:req.body.firstName,lastName:req.body.lastName})
if(!schemaCheck.success){return res.status(411).json({message:"Error"})}
else{
    await User.updateOne({_id:req.userId},req.body)
    res.status(200).json({message:"Updated Successfully"})}
})

router.get("/bulk",async(req,res)=>{
    const filter=req.query.filter ||"";
    const users=await User.find({
        $or:[{firstName:{"regex":filter}},{lastName:{"regex":filter}}]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})
    module.exports=router;