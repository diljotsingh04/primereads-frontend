import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { dateTimeSimplifier } from '../Functions/datetimesimplifier';
import Hashtag from '../Components/Hashtag';
import { useSelector } from 'react-redux';
import { Footer } from '../Components/Footer';
import Loading from '../Components/Loading';

const DetailedBlog = () => {

    let { blogId } = useParams();
    const curUser = useSelector(state => state.user);

    const [blog, setBlog] = useState(null);
    const [errorMessge, seterrorMessge] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getResult = await axios.post(`http://localhost:3000/posts/readblog?postId=${blogId}`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                );
                if (getResult.data.success) {
                    seterrorMessge(null)
                    setBlog(getResult.data.postData);
                }
                else {
                    seterrorMessge(getResult.data.message)
                }
            }
            catch (e) {
                seterrorMessge("Error fetching the data")
            }
        }

        fetchData();
    }, [blogId])

    if (errorMessge) {
        return (
            <div className="flex justify-center items-center h-screen">{errorMessge}</div>
        )
    }

    if (!blog) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className="flex justify-center flex-col item-center mt-[5rem] mb-10">
                {curUser.id === blog.refTo && <Link to={`/blog/edit/${blog._id}`} className="flex justify-center items-center absolute right-5 top-[125px] w-[125px] py-2 px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:ring-1 focus:ring-2">EDIT BLOG</Link>}
                {/* title */}
                <div className="flex justify-center text-3xl font-bold mt-2 md:mt-8 mb-8 p-3">
                    {blog.title}
                </div>
                {/* image */}
                <div className="flex justify-center mb-5 px-2">
                    <img className="h-96 mx-6 object-cover rounded-2xl" src={blog.image} alt="blog image" />
                </div>
                <div className="flex justify-center gap-[10rem] md:gap-[25rem] text-md px-2">
                    {/* date */}
                    <div>
                        <span className="font-bold">Date:&nbsp;</span>
                        {dateTimeSimplifier(blog.updatedAt)}
                    </div>
                    {/* author */}
                    <div>
                        <span className="font-bold">Author:&nbsp;</span>
                        {blog.author}
                    </div>
                </div>
                {/* hashtags */}
                <div className="flex justify-center mt-4 gap-1 text-sm">
                    <span className="font-bold">HashTags:&nbsp;</span>
                    {blog.hashtags.map((value, index) => <Hashtag key={index} value={value} />)}
                </div>
                {/* content */}
                <div className="flex justify-center mt-8 text-lg">
                    <div className="mx-12 md:w-[50%] text-justify" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default DetailedBlog
