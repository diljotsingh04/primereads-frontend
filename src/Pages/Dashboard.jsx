import Profile from "../Components/Profile";
import SideBar from "../Components/SideBar";
import { useSearchParams } from 'react-router-dom';
import UserBlogs from "../Components/UserBlogs";
import CreateBlog from "../Components/CreateBlog";

const Dashboard = () => {

    const [searchParams] = useSearchParams();
    const curTab = searchParams.get('tab');

    return (
        <div className="flex flex-col mt-[3.5rem] md:h-screen md:flex-row">
            <SideBar/>
            <div className="flex justify-center md:ml-[17rem] md:w-[75%] mt-[1rem]">
                {curTab === 'profile' ? <Profile /> : curTab === 'myblogs' ? <UserBlogs /> : curTab === 'create-blog' ? <CreateBlog /> : <Profile />}
            </div>
        </div>
    )
}

export default Dashboard
