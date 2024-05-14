import React, { useState } from 'react';
import { Footer } from '../Components/Footer';
import { IoMdSend } from "react-icons/io";
import { Alert } from "flowbite-react";
import axios from 'axios';

const Contact = () => {
    // State variables to store form data
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        subject: '',
        message: ''
    });
    const [success, setSuccess] = useState(null);
    const [failure, setfailure] = useState(null);

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        setfailure(null);
        setSuccess(null);
        try {
            const addFormData = await axios.post('http://localhost:3000/posts/contactus',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            if(addFormData.data.success){
                setSuccess(addFormData.data.message);
                setFormData({
                    fname: '',
                    lname: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            }
            else{
                setfailure(addFormData.data.message);
            }
            
        } catch (error) {
            setfailure('Failed to submit form');
        }

    };


    return (
        <>
            <section>
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mt-8 mb-4 text-4xl font-bold text-center text-gray-900 dark:text-white">Contact Us</h2>
                    <p className="mb-8 lg:mb-16 text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a feature? Let us know.</p>
                    <form onSubmit={handleSubmit} className="space-y-8 border-2 p-10 rounded-xl">
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                            <div>
                                <label htmlFor="fname" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">First Name</label>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    value={formData.fname}
                                    onChange={handleInputChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 placeholder-gray-500 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    placeholder="First Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lname" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Last Name</label>
                                <input
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    value={formData.lname}
                                    onChange={handleInputChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    placeholder="Last Name"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Your email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="contact@us.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="Let us know how we can help you"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-400">Your message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-00 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Leave a comment..."
                                required
                            ></textarea>
                            {failure && <Alert className="mt-3" color="failure">
                                <span className="font-medium">Alert!</span> Failed to Submit
                            </Alert>}
                            {success && <Alert className="mt-3" color="success">
                                <span className="font-medium">Success!</span> Message submitted successfully
                            </Alert>}
                        </div>
                        <button type="submit" className="py-2 px-3 text-center text-white bg-blue-600 rounded-lg bg-primary-700 sm:w-fit hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"><span className="flex items-center gap-1 justify-center"><IoMdSend />Send message</span></button>
                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;
