import{BrowserRouter,Route,Routes,} from "react-router-dom"
import {Signup} from "./pages/Signup";
import {Signin} from "./pages/Signin"
import {Dashboard} from "./pages/Dashboard"
import {SendMoney} from "./pages/SendMoney"
function App() {

  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/Signup" element={<Signup></Signup>}></Route>
          <Route path="/Signin" element={<Signin></Signin>}></Route>
          <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/SendMoney" element={<SendMoney></SendMoney>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}


export default App
