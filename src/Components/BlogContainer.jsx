import { useNavigate, Link } from 'react-router-dom'
import Hashtag from './Hashtag';
import { dateSimplifier } from '../Functions/datetimesimplifier';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { decrementBalance } from '../Redux/Slices/balanceSlice';
import { SiReadthedocs } from "react-icons/si";
import { IoIosLock } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

const BlogContainer = ({ blog, showEdit, unlocked }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const balance = useSelector(state => state.balance);
    const curUser = useSelector(state => state.user);

    const readMoreHandler = (id) => {
        navigate(`/blog/${id}`);
    }

    const handleUnlock = async (id) => {
        if (balance.amount <= 0) {
            Swal.fire({
                title: "Insufficient Balance!",
                text: "Add your balance to continue",
                icon: "error"
            });
        }
        else {
            Swal.fire({
                title: "Are you sure?",
                text: "One Token will be deducted from your balance",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3dc410",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, sure!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const unlockBlog = await axios.post(`http://localhost:3000/auth/unlockpost/${id}`,
                            {},
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                withCredentials: true
                            }
                        );
                        if (unlockBlog.data.success) {
                            Swal.fire({
                                title: "Unlocked!",
                                text: "Your blog has been unlocked.",
                                icon: "success"
                            });
                            dispatch(decrementBalance(1));
                            navigate('/blogs/unlocked');
                        }
                        else {
                            Swal.fire({
                                title: "Failed!",
                                text: `${unlockBlog.data.message}`,
                                icon: "error"
                            });
                        }
                    }
                    catch (error) {
                        Swal.fire({
                            title: "Failed!",
                            text: `Failed to unlock blog`,
                            icon: "error"
                        });
                    }
                }
            });
        }
    }


    const strippedContent = (content) => {
        return content.replace(/(<([^>]+)>)/gi, '');
    }

    return (
        <div className={`border border-black dark:border-white mx-3 mb-3 ${showEdit !== true ? "h-[23rem]" : "h-[25rem]"} w-[20rem] rounded-lg overflow-hidden md:w-[80%] md:h-[15rem] md:flex relative`}>
            {/* image */}
            <div className="h-[45%] md:h-[100%] md:w-[250px] md:min-w-[250px] md:border-r">
                <img className="h-full w-full object-cover" src={blog.image} />
            </div>

            <div className="md:flex md:justify-center md:flex-col w-full">
                {/* title */}
                <div className="transform-gpu origin-center md:origin-bottom-left font-bold mt-2 mx-2 text-xl text-center leading-6 line-clamp-1 md:text-start py-1 md:p-1 transition duration-300 hover:scale-105 hover:text-blue-600">
                    {blog.title}
                </div>
                {/* description */}
                <div className="text-sm mt-1 px-3 py-1 md:pr-8 line-clamp-2 text-justify text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-300">
                    {strippedContent(blog.content)}
                </div>
                {/* hashtag */}
                <div className="flex justify-center items-center text-sm mt-2 mx-2 md:justify-start px-1">
                    <span className="font-bold">HashTags:&nbsp;</span>
                    <div className="flex justify-center gap-1">
                        {blog.hashtags.length >= 1 && <Hashtag value={blog.hashtags[0]} />}
                        {blog.hashtags.length >= 2 && <Hashtag value={blog.hashtags[1]} />}
                        {blog.hashtags.length >= 3 && <Link to={`/blog/${blog._id}`} ><div className="text-xs ml-[-10px] text-gray-500 items-center px-3 hover:text-black dark:text-gray-300">
                            ...more
                        </div> </Link>}
                    </div>
                </div>
                {/* date  */}
                <div className="flex flex-row mx-2 px-1 justify-between mt-2 md:items-end">
                    <div className="text-sm">
                        {dateSimplifier(blog.updatedAt)}
                    </div>
                    <div>
                        <button onClick={() => { (blog.unlocked || blog.isOwner) ? readMoreHandler(blog._id) : handleUnlock(blog._id) }} className="border border-black rounded-lg py-1 px-2 mx-3 bg-blue-600 text-white hover:bg-blue-700 focus:ring-2">{(blog.unlocked || blog.isOwner) ? <span className="flex items-center gap-1 justify-center"><SiReadthedocs />Read More</span> : <span className="flex items-center gap-1 justify-center"><IoIosLock />Unlock Blog</span>}</button>
                    </div>
                </div>
                {showEdit && <div className="mx-4">
                    <button onClick={() => navigate(`/blog/edit/${blog._id}`)} className="border py-1 m-2 border-black rounded-lg px-3 bg-gray-900 text-white hover:bg-black hover:ring-1 focus:ring-2 dark:border-gray-300 dark:bg-slate-800"><span className="flex items-center gap-1 justify-center"><FaEdit />Edit Blog</span></button>
                </div>} 
                {curUser.id === blog.refTo && <div className="absolute bottom-2 right-3 text-xs text-gray-500">You are the owner of this blog</div>}
            </div>
        </div>
    )
}

export default BlogContainer
