import React from 'react'

const Hashtag = ({value}) => {
    return (
        <div className="text-xs items-center border border-black dark:border-gray-300 dark:text-blue-500 text-blue-800 rounded-full px-3 hover:bg-blue-600 hover:text-white">
            {value}
        </div>
    )
}

export default Hashtag
