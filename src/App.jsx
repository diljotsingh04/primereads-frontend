import Navbar from "./Components/NavigationBar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import MyBlogs from "./Pages/MyBlogs";
import Contact from "./Pages/Contact";

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
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
