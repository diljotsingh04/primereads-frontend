import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { FaBookReader, FaSignOutAlt } from "react-icons/fa";
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { IoCreate } from "react-icons/io5";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUser } from '../Redux/Slices/userSlice';

const SideBar = () => {

    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab');
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <Sidebar aria-label="Default sidebar example" className="w-screen md:w-64 md:fixed md:left-0 md:top-[3rem] md:h-full">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item icon={HiUser} label="User" labelColor="dark" active={tab === 'profile'} as="div">
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Link to="/dashboard?tab=myblogs">
                        <Sidebar.Item icon={FaBookReader} active={tab === 'myblogs'} as="div">
                            My Blogs
                        </Sidebar.Item>
                    </Link>
                    <Link to="/dashboard?tab=create-blog">
                        <Sidebar.Item icon={IoCreate} active={tab === 'create-blog'} as="div">
                            Create Blog
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item onClick={handleLogout} className="cursor-pointer" href="#" icon={FaSignOutAlt} as="div">
                        Logout
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default SideBar
