import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { dateTimeSimplifier } from '../Functions/datetimesimplifier';

const DetailedBlog = () => {

    let { blogId } = useParams();

    const [blog, setBlog] = useState(null);
    const [errorMessge, seterrorMessge] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const getResult = await axios.post(`http://localhost:3000/posts/getpost?postId=${blogId}`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                );
                if (getResult.data.success) {
                    setBlog(getResult.data.postData[0]);
                }
                else {
                    seterrorMessge("Signin or login to see blogs")
                }
            }
            catch (e) {
                seterrorMessge("Error fetching the data")
            }
        }

        fetchData();
    }, [blogId])


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
                        {dateTimeSimplifier(blog.updatedAt)}
                    </div>
                    {/* author */}
                    <div>
                        {blog.author}
                    </div>
                </div>
                {/* hashtags */}
                <div className="flex justify-center mt-5">
                    {blog.hashtags}
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
