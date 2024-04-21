import { useEffect, useState } from 'react';
import axios from 'axios'
import BlogContainer from './BlogContainer';
import { useSelector } from 'react-redux'

const UserBlogs = () => {

    const [blogs, setBlogs] = useState(null);
    const [errorMessge, seterrorMessge] = useState(null);
    const [totalBlogs, setTotalBlogs] = useState(null);

    const curUser = useSelector(state => state.user);
    
    useEffect(() => {
        

        const fetchData = async () => {
            try {
                const getResult = await axios.post(`http://localhost:3000/posts/getpost?userId=${curUser.id}`,
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
    }, [curUser.id])

    
    const handleShowMore = async() => {

        try {
            const getResult = await axios.post(`http://localhost:3000/posts/getpost?startIndex=${blogs.length}&userId=${curUser.id}`,
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
        <div>
            <div className="text-3xl font-bold text-center">MyBlogs</div>
            {blogs ?
                (
                    <>
                        {blogs && blogs.length === 0 ? <div className="flex justify-center items-center h-[70vh]">You haven't any blog yet</div>:
                        blogs && <div className="flex justify-center mx-4 mt-7 gap-2 flex-wrap md:flex-col md:items-center">
                            {blogs.map(blog => <BlogContainer key={blog._id} blog={blog} />)}
                        </div>
                        }
                        <div className="flex justify-center mb-4">
                            {blogs.length != totalBlogs && <button onClick={handleShowMore} >Show more</button>}
                        </div>
                    </>
                )
                :
                (<div className="flex justify-center items-center h-[70vh]">
                    <div>
                        {!errorMessge && <div> Loading...</div>}
                    </div>
                    <div>
                        {errorMessge}
                    </div>
                </div>)
            }
        </div>
    )
}

export default UserBlogs
