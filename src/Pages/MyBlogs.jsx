import { useEffect } from 'react';
import {useSelector} from 'react-redux'
import axios from 'axios'

const MyBlogs = () => {

  const user = useSelector((state) => state.user);

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
      {user.name}
      {user.userImage}
    </div>
  )
}

export default MyBlogs
