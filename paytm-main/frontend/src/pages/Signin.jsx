import { BottomWarning } from "../components/BottomWarning";
import {Heading} from "../components/Heading"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/InputBox.jsx"
import {Button} from "../components/Button"
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const navigate=useNavigate()
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
export function Signin(){
 return <div className="bg-slate-300 flex flex-col h-screen justify-center">
<Heading label={"Sign In"}></Heading>
<SubHeading label={"Enter your credentials to access your account"}></SubHeading>
<InputBox onChange={e=>{setEmail(e.target.value)}} label={"Email"} placeholder="xyz@gmail.com"></InputBox>
<InputBox onChange={e=>{setPassword(e.target.value)}} label={"Password"} placeholder="Password"></InputBox>
<Button onClick={async()=>{const res=await axios.post("http://localhost:3000/api/v1/user/signin",{username:username,password:password})
localStorage.setItem("token",res.data.token)
navigate("/dashboard")}} label={"Sign In"}></Button>
<BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} ></BottomWarning>
 </div>   
}