import {Heading} from "../components/Heading"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/InputBox.jsx"
import {Button} from "../components/Button"
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const navigate=useNavigate()
const [firstName,setFirstName]=useState("")
const [lastName,setLastName]=useState("")
const [username,setUsername]=useState("")
const [password,setPassword]=useState("")
export const Signup=()=>{
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center">
                <Heading label={"Sign Up"}></Heading>
                <SubHeading label={"Enter your information to create account"}></SubHeading>
                <InputBox onChange={e=>{setFirstName(e.target.value)}} placeholder="John" label={"First Name"}></InputBox>
                <InputBox onChange={e=>{setLastName(e.target.value)}} placeholder="Doe" label={"Last Name"}></InputBox>
                <InputBox onChange={e=>setUsername(e.target.value)} placeholder="hasksh@gmail.com" label={"Email"}></InputBox>
                <InputBox onChange={e=>setPassword(e.target.value)} placeholder="121-210" label={"Password"}></InputBox>
                <div className="pt-4">
                    <Button onClick={(async ()=>{const res=await axios.post("http://localhost:3000/api/v1/user/signup",{username:username,firstName:firstName,lastName:lastName,password:password})
                    localStorage.setItem("token",res.data.token)
                    navigate("/dashboard")})} label={"Sign Up"}></Button>
                </div>
 <BottomWarning label={"Don't have an account"} button={"Sign in"}></BottomWarning>
                
            </div>
        </div>

    </div>
}