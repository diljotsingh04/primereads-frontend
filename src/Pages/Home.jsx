import React from 'react'
import { ThreeDCard } from "../Components/ThreeDCard";
import { AnimatedPopupImages } from '../Components/AnimatedPopupImages';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// images
import blog1 from "../assets/images/blog1.jpg";
import blog2 from "../assets/images/blog2.png";
import blog3 from "../assets/images/blog3.jpg";
import premiumContentImage from "../assets/images/premiumContentImage.png";
import interactiveCommunityImage from "../assets/images/interactiveCommunityImage.png";
import primeblog1 from "../assets/images/primeblog1.png";
import primeblog2 from "../assets/images/primeblog2.png";
import primeblog3 from "../assets/images/primeblog3.png";
import referImg from "../assets/images/referImg.jpg"; 

const AboutUs = () => {
    return (
        <div className="w-full py-10 border-t-2">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">ABOUT</h2>
                <p className="text-lg text-center mb-6">
                    At <span className="font-bold">Prime<span className="font-bold text-blue-600">Reads</span></span>, we believe in the power of premium content to inspire, inform, and enrich lives. <br /> 
                    Our mission is to provide readers with access to high-quality articles, expert opinions, and thought-provoking perspectives on a wide range of topics.
                </p>
                <p className="text-lg text-center mb-6">
                    Whether you're passionate about technology, business, health, or culture, we've got you covered. <br />
                    Join our community of avid readers and unlock a world of exclusive insights and engaging narratives.
                </p>
                <p className="text-lg text-center">
                    Explore, learn, and connect with <span className="font-bold">Prime<span className="font-bold text-blue-600">Reads</span></span> today!
                </p>
                <p className="text-center mt-8 text-bold">
                    <Link to="/terms-and-conditions" className="text-gray-600 hover:text-blue-600">Terms & Conditions</Link> 
                </p>
            </div>
        </div>
    );
}

const Home = () => {
    const user = useSelector((state) => state.user);

    return (
        <div className="mt-[5rem] flex flex-col justify-center items-center min-h-[90vh] gap-3">

            <div className='mt-10 text-2xl md:text-5xl text-center md:leading-loose'> 
                Hello <span className="self-center whitespace-nowrap text-3xl md:text-6xl font-bold dark:text-white">Prime<span className="font-bold text-blue-600">Reads</span></span>, <br /> 
                where premium content meets unparalleled experience.
            </div>
            
            {user.id ? 
                <div className="text-lg md:text-2xl text-center border-t-2 border-gray-500 pt-2">
                    Hello, <span className='font-bold text-xl md:text-3xl hover:animate-pulse hover:text-blue-700'>{user.name}</span>!
                </div> 
                : <div className="text-2xl text-center border-t-2 border-gray-500 pt-2"><Link to="/login" className="text-blue-600">LogIn</Link> or <Link to="/signup" className="text-blue-600">SignUp</Link> now to unlock premium blogs!</div>
            }            

            <AnimatedPopupImages images={[
                { id: 1, link: blog1 },
                { id: 2, link: blog2 },
                { id: 3, link: blog3 }
            ]} />

            <div className='mt-0 mx-2 text-xl md:text-3xl text-center md:leading-loose'>
                Explore a world of exclusive insights, expert opinions, and engaging narratives curated just for you. <br />
                Stay ahead of the curve with timely updates and expert analysis on trending topics and emerging trends.
            </div>

            <div className='flex flex-col xl:flex-row gap-10 '>
                <ThreeDCard 
                    cardInfo={{
                        title: "Premium Content",
                        description: "Going beyond the ordinary & providing thought-provoking perspectives.",
                        image: premiumContentImage,
                        imageAlt: "premium content"
                    }}
                    glowColor={"#6d2"} 
                />

                <ThreeDCard 
                    cardInfo={{
                        title: "Interactive Community",
                        description: "Engage with fellow readers, share your insights, and participate in discussions in our vibrant community.",
                        image: interactiveCommunityImage,
                        imageAlt: "interactive community"
                    }} 
                    variant={"inverted"}
                    glowColor={"#0ad"}
                />
            </div>

            <div className='text-xl mx-2 md:text-3xl text-center md:leading-loose'>
                Intuitive interface and user-friendly design make it effortless to discover and revisit your favorite blogs. <br />
                Unlock the content you need to fuel your curiosity and expand your knowledge horizons.
            </div>

            <AnimatedPopupImages images={[
                { id: 1, link: primeblog1 },
                { id: 2, link: primeblog2 },
                { id: 3, link: primeblog3 }
            ]} />

            <div className='mt-0 mb-5 mx-2 text-xl md:text-3xl text-center md:leading-loose'>
            Ready to unlock premium insights and elevate your reading experience? <br />
            Join today and embark on a journey of discovery!
            </div>

            <ThreeDCard 
                cardInfo={{
                    image: referImg,
                    link: "/tokens/addbalance",
                    linkText: "Refer a friend"
                }} 
                variant={"imageWithButton"}
                glowColor={"#88f"}
            />
            <AboutUs />
        </div>
    )
}


export default Home
