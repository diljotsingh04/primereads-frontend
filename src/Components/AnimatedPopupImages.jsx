
export const AnimatedPopupImages = ({images}) => {
    const classAttributes = [
        "rounded-xl  rotate-6 hover:rotate-0 duration-500 hover:-translate-y-12 h-full w-full object-cover hover:scale-150 transform-gpu origin-bottom",
        "rounded-xl  -rotate-12 hover:rotate-0 duration-500 hover:-translate-y-12 h-full w-full object-cover hover:scale-150 transform origin-bottom"
    ]

    return (
        <>
        <section className="bg-white overflow-hidden dark:bg-gray-900">
            <div className="2xl:max-w-screen-3xl px-8 md:px-8 mx-5 mt-1 py-12 lg:py-24 space-y-18 h-svh flex flex-col justify-center">
            <div className="w-11/12 flex flex-col md:flex-row mx-auto">
                {images.map((image) => {
                    return (
                        <div key={image.id} > 
                            <img src={image.link} 
                                className={classAttributes[image.id % 2]} 
                                alt="img" 
                            /> 
                        </div>
                    )
                })}
            </div>
            </div>
        </section>
        </>
    )
}