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
import DetailedBlog from "./Pages/DetailedBlog";
import ProtectedRoute from "./Utils/ProtectedRoute";
import UpdateBlog from "./Pages/UpdateBlog";
import UpdBlg from "./Pages/UpdBlg";
import EditBlog from "./Pages/EditBlog";

function App() {

    return (
        <>
            <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/signup' element={<SignUp />}/>
                    <Route path='/about' element={<About />}/>
                    <Route path='/contact' element={<Contact />}/>
                    <Route path='/blogs' element={<MyBlogs />}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path='/dashboard' element={<Dashboard />}/>
                        <Route path='/blog/:blogId' element={<DetailedBlog />}/>
                        {/* <Route path='/blog/testingedit/:blogId' element={<UpdateBlog />}/> */}
                        {/* <Route path='/blog/editi/:postId' element={<UpdBlg />}/> */}
                        <Route path='/blog/edit/:postId' element={<EditBlog />}/>
                    </Route>
                    {/* <Route path='/clearcookie' element={<ClearCookie />}/> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
