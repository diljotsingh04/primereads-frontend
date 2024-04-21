import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { FaBookReader, FaSignOutAlt } from "react-icons/fa";
import { useSearchParams, Link } from 'react-router-dom';


const SideBar = () => {

    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab');

    return (
        <Sidebar aria-label="Default sidebar example" className="w-screen  md:w-64">
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
                        <Sidebar.Item icon={FaBookReader} active={tab === 'create-blog'} as="div">
                            Create Blog
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item href="#" icon={FaSignOutAlt}>
                        Logout
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default SideBar
