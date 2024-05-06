import { useEffect, useState } from 'react';
import axios from 'axios'
import BlogContainer from '../Components/BlogContainer';
import { Footer } from "../Components/Footer";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../Components/Loading';

const MyBlogs = () => {

    const [blogs, setBlogs] = useState(null);
    const [errorMessge, seterrorMessge] = useState(false);
    const [totalBlogs, setTotalBlogs] = useState(null);
    const curUser = useSelector(state => state.user);

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
                    setTotalBlogs(getResult.data.totalPosts);
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


    const handleShowMore = async () => {

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
            <div className="flex justify-center text-3xl font-bold mt-[6rem]">BLOGS</div>
            {curUser.id && <Link to="/blogs/unlocked" className="flex justify-center items-center absolute right-5 top-[81px] w-[125px] h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2">Unlocked Blogs</Link>}
            {blogs ?
                (
                    <>
                        {blogs && <div className="flex justify-center mx-4 mt-8 gap-2 flex-wrap md:flex-col md:items-center">
                            {blogs.map(blog => <BlogContainer key={blog._id} blog={blog} />)}
                        </div>
                        }
                        <div className="flex justify-center mt-5 mb-5">
                            {blogs.length != totalBlogs && <button onClick={handleShowMore} className='border-2 border-black rounded-full px-3 py-0.5 hover:animate-bounce hover:bg-blue-700 hover:border-blue-700 hover:text-white focus:ring-2'>Show more</button>}
                        </div>
                    </>
                )
                :
                (<div className="flex justify-center items-center h-[80vh]">
                    <div>
                        {!errorMessge &&
                            <Loading />
                        }
                    </div>
                    <div>
                        {errorMessge}
                    </div>
                </div>)
            }
            <Footer />
        </>
    )
}

export default MyBlogs
