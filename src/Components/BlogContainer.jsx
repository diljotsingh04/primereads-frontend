import { useNavigate, Link } from 'react-router-dom'
import Hashtag from './Hashtag';
import { dateSimplifier } from '../Functions/datetimesimplifier';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { decrementBalance } from '../Redux/Slices/balanceSlice';

const BlogContainer = ({ blog, showEdit, unlocked }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const balance = useSelector(state => state.balance);

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
        <div className={`border border-black mx-3 mb-3 ${showEdit !== true ? "h-[23rem]" : "h-[25rem]"} w-[20rem] rounded-lg overflow-auto md:w-[80%] md:h-[15rem] md:flex`}>
            {/* image */}
            <div className="h-[45%] md:h-[100%] md:w-[300px] md:min-w-[250px]">
                <img className="h-full w-full object-cover" src={blog.image} />
            </div>
            {/* title */}
            <div className="md:flex md:justify-center md:flex-col">
                <div className="font-bold mt-2 mx-2 text-lg text-center leading-5 line-clamp-2 md:text-start">
                    {blog.title}
                </div>
                {/* description */}
                <div className="text-sm mt-1 mx-2 text-center line-clamp-4 text-justify">
                    {strippedContent(blog.content)}
                </div>
                {/* hashtag */}
                <div className="flex justify-center items-center text-sm mt-2 mx-2 md:justify-start">
                    <span className="font-bold">HashTags:&nbsp;</span>
                    <div className="flex justify-center gap-1">
                        {blog.hashtags.length >= 1 && <Hashtag value={blog.hashtags[0]} />}
                        {blog.hashtags.length >= 2 && <Hashtag value={blog.hashtags[1]} />}
                        {blog.hashtags.length >= 3 && <Link to={`/blog/${blog._id}`} ><div className="text-xs ml-[-10px] text-gray-500 items-center px-3">
                            ...more
                        </div> </Link>}
                    </div>
                </div>
                {/* date  */}
                <div className="flex flex-row mx-2 justify-between mt-2 md:items-end">
                    <div className="text-base">
                        {dateSimplifier(blog.updatedAt)}
                    </div>
                    {/* uplock button */}
                    {/* <div>
                        <button onClick={() => readMoreHandler(blog._id)} className="border border-black rounded-lg px-2 bg-blue-500 text-white">Read More</button>
                    </div> */}
                    <div>
                        <button onClick={() => { (blog.unlocked || blog.isOwner) ? readMoreHandler(blog._id) : handleUnlock(blog._id) }} className="border border-black rounded-lg px-2 bg-blue-500 text-white">{(blog.unlocked || blog.isOwner) ? "Read More" : "UnlockBlog"}</button>
                    </div>
                </div>
                {showEdit && <div className="mx-4">
                    <button onClick={() => navigate(`/blog/edit/${blog._id}`)} className="border w-full mt-2 border-black rounded-lg px-2 bg-black text-white">Edit Blog</button>
                </div>}
            </div>
        </div>
    )
}

export default BlogContainer
