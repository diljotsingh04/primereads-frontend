import { useEffect } from 'react';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../Redux/Slices/userSlice';
import { setBalance } from '../Redux/Slices/balanceSlice';
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from 'axios';

const NavigationBar = () => {

    const user = useSelector((state) => state.user);
    const token = useSelector(state => state.balance);

    const path = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.id) {
            const fetchData = async () => {
                try {
                    const getBalance = await axios.get(`http://localhost:3000/auth/getuserdata/${user.id}`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            withCredentials: true
                        }
                    );

                    if (getBalance.data.success) {
                        dispatch(setBalance(getBalance.data.balance));
                    }
                    else {
                        console.log('Failed to fetch token balance')
                    }

                }
                catch (e) {
                    console.log('Failed to fetch token balance', e)
                }
            }
            fetchData();
        }

    }, [])


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
            navigate('/signup');
        }
    }   


    return (
        <Navbar fluid className="border-b-2 fixed w-full top-0 z-50">
            <Navbar.Brand href="/">
                {/* <img src="/favicon.svg" className   ="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Prime<span className="text-2xl font-semibold text-blue-600">Reads</span></span>
            </Navbar.Brand>
            <div className="flex items-center md:order-2 gap-2">


                {user.id ?
                    <>
                        <div className="hidden border border-black rounded-md p-1 md:block">
                            <span>Tokens:</span>
                            <span>{token.amount}</span>
                        </div>

                        <Dropdown
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
                            <Dropdown.Header className="md:hidden">
                                <span className="font-bold">Tokens:</span>
                                <span>{token.amount}</span>
                            </Dropdown.Header>
                            <Dropdown.Item onClick={() => navigate("/dashboard?tab=profile")}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate("/dashboard?tab=myblogs")}>Dashboard</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate("/dashboard?tab=create-blog")}>Create Blog</Dropdown.Item>
                            <Dropdown.Item>Add Balance</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                        </Dropdown>
                    </>
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
