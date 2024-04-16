import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios'
import BlogContainer from '../Components/BlogContainer';

const MyBlogs = () => {

    const user = useSelector((state) => state.user);

    useEffect(() => {

        const fetchData = async () => {
            // const getResult = await axios.get('http://localhost:3000/getcookie',
            //   {
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     withCredentials: true
            //   }
            // );
        }

        // fetchData();
    }, [])


    return (
        <div className="flex justify-center mx-6 my-9">
            <BlogContainer />
            <BlogContainer />
            <BlogContainer />
        </div>
    )
}

export default MyBlogs
