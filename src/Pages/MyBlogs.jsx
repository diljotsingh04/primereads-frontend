import { useEffect } from 'react';
import axios from 'axios'

const MyBlogs = () => {

  useEffect(() => {

    const fetchData = async () => {
      const getResult = await axios.get('http://localhost:3000/getcookie',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      console.log(getResult.data);
    }

    fetchData();
  }, [])


  return (
    <div>
      My Blogs
    </div>
  )
}

export default MyBlogs
