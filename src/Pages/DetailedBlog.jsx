import React from 'react'
import { useParams } from 'react-router-dom'

const DetailedBlog = () => {

    let { blogId } = useParams();


    return (
        <div>
            {blogId}
        </div>
    )
}

export default DetailedBlog
