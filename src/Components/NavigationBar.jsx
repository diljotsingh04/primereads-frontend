import React from 'react';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../Redux/Slices/userSlice';
import axios from 'axios';

const NavigationBar = () => {

    const path = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async() => {
        const logoutUser = await axios.get('http://localhost:3000/auth/logout',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        );

        if(logoutUser.data.success){
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
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnfAxGV-fZxGL9elM_hQ2tp7skLeSwMyUiwo4lMm1zyA&s" rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Dummy name</span>
                        <span className="block truncate text-sm font-medium">name@example.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                </Dropdown>
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
