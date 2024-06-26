import { useEffect } from 'react';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../Redux/Slices/userSlice';
import { setBalance } from '../Redux/Slices/balanceSlice';
import axios from 'axios';
import ThemeToggler from './LDToggler/ThemeToggler';
import TokenImage from '../assets/images/token.png'

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
                    const getBalance = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/getuserdata/${user.id}`,
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
                        console.log(getBalance.data.message)
                        console.log('Failed to fetch token balance')
                    }

                }
                catch (e) {
                    console.log('Failed to fetch token balance', e)
                }
            }
            fetchData();
        }

    }, [user.id])


    const handleLogout = async () => {
        const logoutUser = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
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
        <Navbar fluid className="border-b-2 fixed w-full top-0 z-50 bg-transparent backdrop-blur-md">
            <Navbar.Brand href="/">
                {/* <img src="/favicon.svg" className   ="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Prime<span className="text-2xl font-semibold text-blue-600">Reads</span></span>
            </Navbar.Brand>
            <div className="flex items-center md:order-2 gap-2">

                <ThemeToggler />
                {user.id ?
                    <>
                        <Link to="/tokens/addbalance"><div className="hidden border border-black dark:border-gray-400 rounded-md py-1 px-2 md:block">
                            <div className="flex">
                                <img src={TokenImage} alt="tokenImage" className="h-6"/>
                                <div>
                                    <span>Tokens: </span>
                                    <span>{token.amount}</span>
                                </div>
                            </div>
                        </div></Link>

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
                            <Dropdown.Item onClick={() => navigate("/tokens/addbalance")}>Add Balance</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                        </Dropdown>
                    </>
                    :
                    <div className="border rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                        <Link className="items-center m-1 px-2 text-lg font-normal block text-white dark:border-gray-700 dark:text-white  dark:hover:text-white hover:bg-blue-700" to="/signup">
                            Sign In
                        </Link>
                    </div>}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link className="transform text-lg transition duration-300 hover:scale-105" to="/">
                    <Navbar.Link className={`md:hover:text-blue-600`} as="div" active={path === '/'}>Home</Navbar.Link>
                </Link>
                <Link className="transform text-lg transition duration-300 hover:scale-105" to="/blogs">
                    <Navbar.Link className={`md:hover:text-blue-600`} as="div" active={path === '/blogs'}>Blogs</Navbar.Link>
                </Link>
                <Link className="transform text-lg transition duration-300 hover:scale-105" to="/about">
                    <Navbar.Link className={`md:hover:text-blue-600`} as="div" active={path === '/about'}>About</Navbar.Link>
                </Link>
                <Link className="transform text-lg transition duration-300 hover:scale-105" to="/contact">
                    <Navbar.Link className={`md:hover:text-blue-600`} as="div" active={path === '/contact'}>Contact Us</Navbar.Link>
                </Link>
            </Navbar.Collapse>

        </Navbar>
    );
}


export default NavigationBar
