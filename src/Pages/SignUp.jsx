import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {

   return (
      <div className="flex justify-center items-center min-h-[80vh]">
         <div className="w-[50%] flex justify-center flex-col m-20">
            <div className="text-5xl">Prime<span className="text-blue-600">Reads</span></div>
            <div className="text-2xl">Signup Now to get 10 tokens free</div>
         </div>
         <div className="w-[50%] ">
            <div>
               <form className="flex max-w-md flex-col gap-4 border border-gray-800 p-10 rounded-xl">
               <div>
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
                  
                  <Button className="bg-blue-600 enabled:hover:bg-blue-700" type="submit">Register new account</Button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default SignUp;
