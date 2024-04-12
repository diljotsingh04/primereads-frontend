import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className="flex justify-center items-center min-h-[90vh] gap-3">
            <Link className="border border-black" to="/signup">SignUp</Link>
            <Link className="border border-black" to="/login">Login</Link>
        </div>
    )
}

export default Home
