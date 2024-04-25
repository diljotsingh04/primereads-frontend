import { useNavigate, Link } from 'react-router-dom'
import Hashtag from './Hashtag';
import { dateSimplifier } from '../Functions/datetimesimplifier';

const BlogContainer = ({ blog, showEdit }) => {
    const navigate = useNavigate();

    const readMoreHandler = (id) => {
        navigate(`/blog/${id}`);
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
                    <div>
                        <button onClick={() => readMoreHandler(blog._id)} className="border border-black rounded-lg px-2 bg-blue-500 text-white">Read More</button>
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
