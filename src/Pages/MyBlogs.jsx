import { useEffect, useState } from 'react';
import axios from 'axios'
import BlogContainer from '../Components/BlogContainer';

const MyBlogs = () => {

    const [blogs, setBlogs] = useState(null);
    const [errorMessge, seterrorMessge] = useState(null);
    const [totalBlogs, setTotalBlogs] = useState(null);

    
    useEffect(() => {
        

        const fetchData = async () => {
            try {
                const getResult = await axios.post('http://localhost:3000/posts/getpost',
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
                    console.log(getResult.data)
                    setTotalBlogs(getResult.data.totalPosts)
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

    
    const handleShowMore = async() => {

        try {
            const getResult = await axios.post(`http://localhost:3000/posts/getpost?startIndex=${blogs.length}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            if (getResult.data.success) {
                setBlogs([...blogs, ...getResult.data.postData]);
            }
            else {
                seterrorMessge("Signin or login to see blogs")
            }
        }
        catch (e) {
            seterrorMessge("Error fetching the data")
        }
    }

    return (
        <>
            <div className="flex justify-center text-3xl mt-4 font-bold mt-[5rem]">Blogs</div>
            {blogs ?
                (
                    <>
                        {blogs && <div className="flex justify-center mx-4 mt-7 gap-2 flex-wrap md:flex-col md:items-center">
                            {blogs.map(blog => <BlogContainer key={blog._id} blog={blog} />)}
                        </div>
                        }
                        <div className="flex justify-center mb-3">
                            {blogs.length != totalBlogs && <button onClick={handleShowMore} >Show more</button>}
                        </div>
                    </>
                )
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
