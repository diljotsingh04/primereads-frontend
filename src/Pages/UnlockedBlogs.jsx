import { useEffect, useState } from 'react';
import axios from 'axios'
import BlogContainer from '../Components/BlogContainer';
import { Button } from "flowbite-react";
import { Link } from 'react-router-dom'
import { Footer } from '../Components/Footer';
import Loading from '../Components/Loading';

const UnlockedBlogs = () => {

    const [blogs, setBlogs] = useState(null);
    const [errorMessge, seterrorMessge] = useState(null);


    useEffect(() => {


        const fetchData = async () => {
            try {
                const getResult = await axios.post('http://localhost:3000/posts/getunlockedblogs',
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
            <div className="flex justify-center text-3xl font-bold mt-[5rem]">Unlocked Blogs</div>
            <Link to="/blogs" className="flex justify-center items-center absolute right-5 top-[81px] w-[125px] h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2">All Blogs</Link>
            <button className="hidden absolute right-5 top-[81px] w-[125px] h-10 bg-blue-500 text-white rounded-md">Unlocked Blogs</button>
            {blogs ?
                (
                    <>
                        {blogs.length === 0 ? <div className="flex justify-center items-center h-[80vh]">
                            You don't have any unlocked blogs yet
                        </div>
                        :
                        blogs && <div className="flex justify-center mx-4 mt-7 gap-2 flex-wrap md:flex-col md:items-center">
                            {blogs.map(blog => <BlogContainer key={blog._id} blog={blog} />)}
                        </div>
                        }
                    </>
                )
                :
                (<div className="flex justify-center items-center h-[80vh]">
                    <div>
                        {!errorMessge && <Loading />}
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

export default UnlockedBlogs