import React from 'react'
import { Footer } from '../Components/Footer';
import { ThreeDCard } from '../Components/ThreeDCard';
import aboutImage from "../assets/images/about.jpg";

const About = () => {
  return (
    <>
      <div className='container mt-5 py-10 mx-auto px-10 md:px-30 lg:px-40 2xl:px-96  text-center'>
        <div className='text-3xl font-bold mt-8'>About</div> <br />

        <ThreeDCard
          cardInfo={{
            image: aboutImage,
            imageAlt: "about"
          }} 
          variant={"image"}
          glowColor={"#19a"}
        />

        <div className='text-xl leading-loose text-justify mt-5'>
          At <span className="font-semibold">Prime<span className="font-semibold text-blue-600">Reads</span></span>, we believe that great ideas deserve a platform where they can flourish and inspire. 
          Our mission is to provide readers with access to a curated collection of premium content that goes beyond the ordinary and sparks thought-provoking conversations. <br /><br />
          
          With PrimeReads, you'll embark on a journey through a world of exclusive insights, expert opinions, and engaging narratives. Whether you're passionate about technology, business, 
          health, or culture, our platform offers something for everyone. <br /><br />

          Unlock the power of knowledge and stay ahead of the curve with timely updates and expert analysis on trending topics and emerging trends. Join our vibrant community of avid readers, 
          engage in discussions, and share your insights with like-minded individuals. <br /> <br />

          Experience the difference with PrimeReads and elevate your reading experience to new heights. Welcome to a world where premium content meets unparalleled excellence. <br /><br />

        </div>
    </div>
      <Footer />
    </>
  )
}

export default About
