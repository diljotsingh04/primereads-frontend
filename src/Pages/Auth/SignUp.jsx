import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {

   const handleSubmit = (e) =>{
      e.preventDefault();
   }

   return (
      <div className="flex justify-center items-center min-h-[80vh] flex-col md:flex-row">
         <div className="w-[50%] flex justify-center flex-col md:ml-44">
            <div className="text-4xl md:text-5xl">Prime<span className="text-blue-600">Reads</span></div>
            <div className="text-base md:text-2xl">Signup Now to get 10 tokens free</div>
         </div>
         <div className="w-[50%]">
            <div className="border border-gray-800 rounded-xl md:mr-72">
               <form className="p-3 flex md:max-w-md flex-col gap-4 md:p-8" onSubmit={handleSubmit}>
                  <div>
                     <div className="w-[100%]">
                        <div className="mb-2 block">
                           <Label htmlFor="name" value="Your name" />
                        </div>
                        <TextInput id="name" type="text" placeholder="Enter your name" required shadow />
                     </div>
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
                     <div>
                        <div className="mb-2 block">
                           <Label htmlFor="repeat-password" value="Repeat password" />
                        </div>
                        <TextInput id="repeat-password" type="password" placeholder="Confirm password" required shadow />
                     </div>
                     <Button className="bg-blue-600 mt-4 enabled:hover:bg-blue-700 md:w-[100%]" type="submit">Register new account</Button>
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

export default SignUp;
