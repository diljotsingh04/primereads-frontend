import { useState, useEffect } from 'react'
import { Button, Checkbox, Label, TextInput, Alert } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createuser } from '../../Redux/Slices/userSlice';
import axios from "axios";
import OAuth from './OAuth';

const Refer = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { prevUserId } = useParams();

    // check if user already logged in
    const curUser = useSelector(state => state.user);

    useEffect(() => {
        if (curUser.id) {
            navigate('/blogs')
        }
    }, []);

    const [signupData, setSignUpData] = useState({});
    const [repeatPass, setRepeatPass] = useState("");
    const [failureMessage, setFailureMessage] = useState(null);

    const handleChange = (e) => {
        setSignUpData({ ...signupData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (signupData.password !== repeatPass) {
            return alert("both passwords are different")
        }

        try {
            const createUser = await axios.post('http://localhost:3000/auth/signup',
                signupData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            if (!createUser.data.success) {
                setFailureMessage(createUser.data.message);
            }
            else {
                setFailureMessage(null);
                dispatch(createuser(createUser.data));
                navigate('/blogs')
            }

        }
        catch (e) {
            setFailureMessage(`Failed to Signup ${e}`)
        }
    }

    return (
        <div className="mt-[5rem] flex justify-center items-center min-h-[80vh] flex-col md:flex-row md:mx-20 gap-5">
            <div className="w-[50%] flex justify-center flex-col">
                <div className="text-4xl md:text-5xl">Prime<span className="text-blue-600">Reads</span></div>
                <div className="text-base md:text-2xl">Signup Now to get 10 tokens free</div>
                <div className="text-base md:text-2xl">{prevUserId}</div>
            </div>
            <div className="w-[50%]">
                <div className="border border-gray-800 rounded-xl md:w-96">
                    <form className="p-3 flex md:max-w-md flex-col gap-4 md:p-8" onSubmit={handleSubmit}>
                        {failureMessage && <Alert color="failure">
                            <span className="font-medium">Alert!</span> {failureMessage}
                        </Alert>}
                        <div>
                            <div className="w-[100%]">
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Your name" />
                                </div>
                                <TextInput onChange={handleChange} id="name" type="text" placeholder="Enter your name" required shadow />
                            </div>
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
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="repeat-password" value="Repeat password" />
                                </div>
                                <TextInput onChange={(e) => setRepeatPass(e.target.value)} id="repeat-password" type="password" placeholder="Confirm password" required shadow />
                            </div>
                            <Button className="bg-blue-600 mt-4 enabled:hover:bg-blue-700 w-[100%]" type="submit">Register new account</Button>
                            <OAuth setFailureMessage={setFailureMessage}/>
                            <div className="flex items-center">
                                <Label htmlFor="agree" className="flex">
                                    Already have an acccount&nbsp;
                                    <Link to="/login" className="text-blue-600 hover:underline">
                                        Login
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

export default Refer;
