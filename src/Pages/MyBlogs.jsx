import { useEffect, useState } from 'react';
import axios from 'axios'
import BlogContainer from '../Components/BlogContainer';

const MyBlogs = () => {

    const [blogs, setBlogs] = useState(null);

    console.log(blogs)
    useEffect(() => {

        const fetchData = async () => {
            const getResult = await axios.post('http://localhost:3000/posts/getpost',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );
            setBlogs(getResult.data);
        }

        fetchData();
    }, [])


    return (
        <>
            <div className="flex justify-center text-3xl mt-4 font-bold">Blogs</div>
            {blogs ?
                (blogs && <div className="flex justify-center mx-4 my-7 gap-2 flex-wrap md:flex-col md:items-center">
                    {blogs.postData.map(blog => <BlogContainer key={blog._id} blog={blog} />)}
                </div>)
            :
            (<div>
                Loading...
            </div>)
            }
        </>
    )
}

export default MyBlogs
