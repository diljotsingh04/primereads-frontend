import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { dateTimeSimplifier } from '../Functions/datetimesimplifier';
import Hashtag from '../Components/Hashtag';

const DetailedBlog = () => {

    let { blogId } = useParams();

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

    if(errorMessge){
        return (
            <div className="flex justify-center items-center h-screen">{errorMessge}</div>
        )
    }

    if (!blog) {
        return (
            <div className="flex justify-center items-center h-[100vh]">Loading...</div>
        )
    }

    return (

        blog ?
            <div className="flex justify-center mt-4 flex-col item-center mt-[5rem]">
                {/* title */}
                <div className="flex justify-center text-3xl font-bold">
                    {blog.title}
                </div>
                {/* image */}
                <div className="flex justify-center">
                    <img className="h-96 mx-6 object-cover" src={blog.image} alt="blog image" />
                </div>
                <div className="flex justify-center gap-[25rem]">
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
                <div className="flex justify-center mt-5 gap-1">
                    <span className="font-bold">HashTags:&nbsp;</span>
                    {blog.hashtags.map((value, index) => <Hashtag key={index} value={value} />)}
                </div>
                {/* content */}
                <div className="flex justify-center mt-5">
                    <div className="mx-28 md:w-[50%] text-justify" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                </div>
            </div>
            :
            <div>Loading..</div>

    )
}

export default DetailedBlog
