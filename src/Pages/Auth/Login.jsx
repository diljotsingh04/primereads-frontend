import React from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="flex justify-center items-center min-h-[80vh] flex-col md:flex-row md:mx-20">
            <div className="w-[50%] flex justify-center flex-col">
                <div className="text-5xl">Prime<span className="text-blue-600">Reads</span></div>
                <div className="text-2xl">Login Now to read recent blogs</div>
            </div>
            <div className="w-[50%]">
                <div className="border border-gray-800 rounded-xl">
                    <form className="p-3 flex md:max-w-md flex-col gap-4 md:p-8">
                        <div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email2" value="Your email" />
                                </div>
                                <TextInput id="email2" type="email" placeholder="Enter your password" required shadow />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password2" value="Your password" />
                                </div>
                                <TextInput id="password2" type="password" placeholder="Enter your password" required shadow />
                            </div>
                            <Button className="bg-blue-600 mt-4 enabled:hover:bg-blue-700 md:w-[100%]" type="submit">Login</Button>
                            <div className="flex items-center">
                                <Label htmlFor="agree" className="flex">
                                    Create a new account&nbsp;
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
