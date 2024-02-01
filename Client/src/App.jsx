import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/signUp"
import Signin from "./pages/SignIn"
import Home from "./pages/Home"
import Header from "./component/Header"
import Profile from "./pages/profile"
import About from "./pages/About"
import PrivateRoute from "./component/PrivateRoute"

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
   <Routes>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/signin" element={<Signin />}/>
    <Route path="/about" element={<About />}/>
    
    <Route  element={<PrivateRoute />}>  
    <Route path="/profile" element={<Profile />}/>
    </Route>
    <Route path="/" element={<Home />}/>
   </Routes>
    </BrowserRouter>
  )
}
