import React from 'react';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../Redux/Slices/userSlice';
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from 'axios';

const NavigationBar = () => {

    const user = useSelector((state) => state.user);

    const path = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const logoutUser = await axios.get('http://localhost:3000/auth/logout',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        );

        if (logoutUser.data.success) {
            dispatch(removeUser());
            navigate('/login');
        }
    }

    return (
        <Navbar fluid className="border-b-2" >
            <Navbar.Brand href="/">
                {/* <img src="/favicon.svg" className   ="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Prime<span className="text-2xl font-semibold text-blue-600">Reads</span></span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {user.id ? <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img={user.userImage} rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{user.name}</span>
                        <span className="block truncate text-sm font-medium">{user.email}</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Add Balance</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                </Dropdown>
                :
                <div className="border rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                    <Link className="flex items-center m-1 text-lg font-normal block text-white dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" to="/signup">
                        Signin&nbsp;<FaLongArrowAltRight />
                    </Link>
                </div>}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link className="text-lg" to="/">
                    <Navbar.Link as="div" active={path === '/'}>Home</Navbar.Link>
                </Link>
                <Link className="text-lg" to="/blogs">
                    <Navbar.Link as="div" active={path === '/blogs'}>Blogs</Navbar.Link>
                </Link>
                <Link className="text-lg" to="/about">
                    <Navbar.Link as="div" active={path === '/about'}>About</Navbar.Link>
                </Link>
                <Link className="text-lg" to="/contact">
                    <Navbar.Link as="div" active={path === '/contact'}>Contact Us</Navbar.Link>
                </Link>
            </Navbar.Collapse>

        </Navbar>
    );
}


export default NavigationBar