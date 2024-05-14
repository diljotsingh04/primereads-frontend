import { useEffect, useState } from 'react'
import axios from "axios"

const ClearCookie = () => {

    const [message, setMessage] = useState(null);

    useEffect(() => {
        const clearApiReq = async () => {
            const clearData = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/clearcookie`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                });

            console.log(clearData)
            if(clearData.data.success)
                setMessage(clearData.data.message);
            else
                setMessage("error setting data")
        }
        clearApiReq();
    }, [])


    return (
        <div>
            <h1>Cookies data Cleared Successfully</h1>
            <h3>{message}</h3>
        </div>
    )
}

export default ClearCookie
