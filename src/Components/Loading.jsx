import LoadingAnimation from '../assets/images/LoadingAnimation.gif'

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <img className="h-14 w-14" src={LoadingAnimation} alt="Loading.." />
        </div>
    )
}

export default Loading
