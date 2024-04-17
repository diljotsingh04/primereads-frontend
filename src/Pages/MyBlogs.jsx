import { useEffect, useState } from 'react';
import axios from 'axios'
import BlogContainer from '../Components/BlogContainer';

const MyBlogs = () => {

    const [blogs, setBlogs] = useState(null);
    const [errorMessge, seterrorMessge] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const getResult = await axios.post('http://localhost:3000/posts/getpost?order=asc',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                );

                if (getResult.data.success) {
                    setBlogs(getResult.data.postData);
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
    }, [])


    return (
        <>
            <div className="flex justify-center text-3xl mt-4 font-bold">Blogs</div>
            {blogs ?
                (blogs && <div className="flex justify-center mx-4 my-7 gap-2 flex-wrap md:flex-col md:items-center">
                    {blogs.map(blog => <BlogContainer key={blog._id} blog={blog} />)}
                </div>)
                :
                (<div>
                    <div>
                        {!errorMessge && <div> Loading...</div>}
                    </div>
                    <div>
                        {errorMessge}
                    </div>
                </div>)
            }
        </>
    )
}

export default MyBlogs
