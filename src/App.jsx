import Navbar from "./Components/NavigationBar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import MyBlogs from "./Pages/MyBlogs";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/Login";
import ClearCookie from "./ToBeDeletedLater/ClearCookie";

function App() {

    return (
        <>
            <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/about' element={<About />}/>
                    <Route path='/dashboard' element={<Dashboard />}/>
                    <Route path='/blogs' element={<MyBlogs />}/>
                    <Route path='/contact' element={<Contact />}/>
                    <Route path='/signup' element={<SignUp />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/clearcookie' element={<ClearCookie />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
