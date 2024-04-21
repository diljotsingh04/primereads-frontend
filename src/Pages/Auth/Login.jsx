import { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { createuser } from '../../Redux/Slices/userSlice';
import axios from "axios";
import OAuth from './OAuth';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginData, setloginData] = useState({});
    const [failureMessage, setFailureMessage] = useState(null);

    const handleChange = (e) => {
        setloginData({ ...loginData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginUser = await axios.post('http://localhost:3000/auth/signin',
                loginData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            if (!loginUser.data.success) {
                setFailureMessage(loginUser.data.message);
            }
            else {
                setFailureMessage(null);
                dispatch(createuser(loginUser.data));
                navigate('/blogs');
            }

        }
        catch (e) {
            setFailureMessage(`Failed to Login ${e}`)
        }
    }
    
    return (
        <div className="flex justify-center items-center min-h-[80vh] flex-col md:flex-row md:mx-20 gap-5">
            <div className="w-[50%] flex justify-center flex-col">
                <div className="text-4xl md:text-5xl">Prime<span className="text-blue-600">Reads</span></div>
                <div className="text-base md:text-2xl">Login now to read recent blogs</div>
            </div>
            <div className="w-[50%]">
                <div className="border border-gray-800 rounded-xl md:w-96">
                    <form className="p-3 flex md:max-w-md flex-col gap-4 md:p-8" onSubmit={handleSubmit}>
                        {failureMessage && <Alert color="failure">
                            <span className="font-medium">Alert!</span> {failureMessage}
                        </Alert>}
                        <div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email" />
                                </div>
                                <TextInput onChange={handleChange} id="email" type="email" placeholder="Enter your email" required shadow />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Your password" />
                                </div>
                                <TextInput onChange={handleChange} id="password" type="password" placeholder="Enter your password" required shadow />
                            </div>
                            <Button className="bg-blue-600 mt-4 enabled:hover:bg-blue-700 w-[100%]" type="submit">Login</Button>
                            <OAuth setFailureMessage={setFailureMessage}/>
                            <div className="flex items-center">
                                <Label htmlFor="agree" className="flex">
                                    Create new account&nbsp;
                                    <Link to="/signup" className="text-blue-600 hover:underline">
                                        Signup
                                    </Link>
                                </Label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
