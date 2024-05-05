import Navbar from "./Components/NavigationBar"
import SplashScreen from "./Components/SplashScreen"
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
import EditBlog from "./Pages/EditBlog";
import UnlockedBlogs from "./Pages/UnlockedBlogs";
import AddBalance from "./Pages/AddBalance";
import Refer from "./Pages/Auth/Refer";
import TermsAndConditions from "./Pages/TermsAndConditions";
import { useState, useEffect } from "react";
import Success from "./Pages/Success";
import Failure from "./Pages/Failure";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <BrowserRouter>
                {loading ? (
                    <SplashScreen /> 
                ) : (
                    <>
                        <Navbar />
                        <Routes>
                            <Route path='/' element={ loading ? <SplashScreen /> : <Home /> }/>
                            <Route path='/login' element={<Login />}/>
                            <Route path='/signup' element={<SignUp />}/>
                            <Route path='/about' element={<About />}/>
                            <Route path='/contact' element={<Contact />}/>
                            <Route path='/blogs' element={<MyBlogs />}/>
                            <Route path='/terms-and-conditions' element={<TermsAndConditions />}/>
                            <Route path='/refer/:prevUserId' element={<Refer />}/>
                            <Route element={<ProtectedRoute/>}>
                                <Route path='/dashboard' element={<Dashboard />}/>
                                <Route path='/blog/:blogId' element={<DetailedBlog />}/>
                                <Route path='/blog/edit/:postId' element={<EditBlog />}/>
                                <Route path='/blogs/unlocked/' element={<UnlockedBlogs />}/>
                                <Route path='/tokens/addbalance/' element={<AddBalance />}/>
                                <Route path='/success' element={<Success />}/>
                                <Route path='/failure' element={<Failure />}/>
                            </Route>
                            {/* <Route path='/clearcookie' element={<ClearCookie />}/> */}
                        </Routes>
                    </>
                    )
                }
            </BrowserRouter>
        </>
    )
}

export default App
