import React from 'react'

const BlogContainer = ({blog}) => {
    return (
        <div className="border border-black mx-3 mb-3 h-[24rem] w-[20rem] rounded-lg overflow-auto md:w-[80%] md:h-[15rem] md:flex">
            {/* image */}
            <div className="h-[45%] md:h-40 md:h-[100%] md:w-[60rem]">
                <img className="h-full w-full object-cover" src="https://i.stack.imgur.com/mw2Lz.png" />
            </div>
            {/* title */}
            <div className="md:flex md:justify-center md:flex-col">
                <div className="font-bold mt-2 mx-2 text-lg text-center leading-5 line-clamp-2 md:text-start">
                    This is the title of Blog of the website whcih contains all information fadskfalfdkjk
                </div>
                {/* description */}
                <div className="text-sm mt-1 mx-2 text-center line-clamp-4 text-justify">
                    This is the description of website. This is the description of website. . This is the description of website. . This is the description of website.. This is the description of website.This is the des cription of website. This is the descriptio n of website,
                </div>
                {/* hashtag */}
                <div className="flex justify-center items-center text-sm mt-2 mx-2 md:justify-start">
                    <span className="font-bold">HashTags:&nbsp;</span>
                    <div className="flex justify-center gap-1">
                        <div className="text-xs items-center border border-black rounded-lg px-3">
                            #Ai
                        </div>
                        <div className="text-xs items-center border border-black rounded-lg px-3 break-all">
                            #machine learning
                        </div>
                    </div>
                </div>
                {/* date  */}
                <div className="flex flex-row mx-2 justify-between mt-2 md:items-end">
                    <div className="text-base">
                        16-April-2024
                    </div>
                    {/* uplock button */}
                    <div>
                        <button className="border border-black rounded-lg px-2 bg-blue-500 text-white">Unlock: 1 token</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogContainer
