import React from 'react'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import HighlightText from '../components/core/HomePage/HighlightText'
import Quote from '../components/core/AboutPage/Quote'
import Stats from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import FoundingStory from "../assets/Images/FoundingStory.png"
import ReviewSlider from '../components/common/ReviewSlider'

const Aboutus = () => {
  return (
    <div className=' text-white'>
        {/* Section 1 */}
        <section className=' bg-richblack-800 '>
            <div className='w-11/12 mx-auto pt-[80px] flex flex-col items-center'>
                <p className=' text-richblack-200 text-base'>About Us</p>
                <header className=' mt-[50px] mb-[40px] flex flex-col text-[36px] leading-10 font-semibold items-center'> 
                    <span>Driving Innovation in Online Education for a</span>
                    <HighlightText text={"Brighter Future"} direction={"bg-gradient-to-b"} gradient={" from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"} />
                </header>
                <p className=' w-2/3 text-richblack-300'><center>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</center></p>
                
            
                <div className='flex flex-col lg:flex-row flex-wrap gap-6 mx-auto lg:translate-y-14'>
                    <img alt=''  src={BannerImage1} />
                    <img alt='' src={BannerImage2} />
                    <img alt='' src={BannerImage3} />
                </div>
            </div>
        </section>

        {/* Section 2 */}
        <section>
            <Quote/>
        </section>

        {/* Section 3 */}
        <section>
            <div className='flex flex-col border-t border-richblack-700'>
            {/* founding story wala div */}
                <div className='flex'>
                {/* Founding story left box */}
                <div className=' flex flex-col lg:flex-row py-24 px-32 gap-24'>
                    <div>
                        <h1 className=' text-[36px]'>
                        <HighlightText text={"Brighter Future"} direction={"bg-gradient-to-br"} gradient={" from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"} />
                        </h1>
                        <p className=' text-richblack-300 mt-6 mb-4'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                        <p className=' text-richblack-300'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    <img className='w-1/2 ' src={FoundingStory} alt='' />
                </div>
                </div>
                {/* vision and mission wala parent div */}
                {/* Left box */}
                <div className='flex flex-col lg:flex-row py-24 px-32 gap-24'>
                    <div>
                        <HighlightText  text={"Our Vision"} direction={"bg-gradient-to-b text-[36px]"} gradient={" from-[#E65C00] to-[#F9D423]"} />
                        <p className=' text-richblack-300 mt-6'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    {/* Right box */}
                    <div>
                        <HighlightText text={"Our Mission"} direction={"bg-gradient-to-br text-[36px]"} gradient={" from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"} />
                        <p className=' text-richblack-300 mt-6'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 4 */}
        <Stats/>

        {/* Section 5 */}
        <section className=' mx-auto flex flex-col items-center justify-between gap-5 py-[90px]'>
        <LearningGrid/>
        <ContactFormSection/>
        </section>

        {/* Review Section */}
        <div>
                <h2 className=' text-center text-3xl font-bold'>Review section</h2>
                <ReviewSlider/>
            </div>

        <Footer/>

    </div>
  )
}

export default Aboutus