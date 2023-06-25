import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'
import Button from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlock from '../components/core/HomePage/CodeBlock'

const Home = () => {
  return (
    <div>

    {/* Section 1 */}

    <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
    text-white justify-between'>

      {/* Instructor button */}
      <Link to={"/signup"}>
        <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
        transition-all duration-200 hover:scale-95 w-fit'>
          <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
          transition-all duration-200 group-hover:bg-richblack-900'>
            <p>Become an Instructor</p>
            <FaArrowRight/>
          </div>
        </div>
      </Link>

      {/* heading */}
      <div className='text-center text-4xl font-semibold mt-7'>
            Empower Your Future with <HighlightText text={"Coding Skills"}/>
      </div>

      {/* SubHeading */}
      <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
      </div>

      {/* Buttons */}
      <div className='flex flex-row gap-7 mt-8'>
        <Button active={true} linkto={"/signup"}>
          Learn More
        </Button>

        <Button active={false} linkto={"/login"}>
          Book a Demo
        </Button>
      </div>

      {/* Banner */}
      <div className='mx-3 my-12 shadow-blue-200'>
        <video
        loop
        muted
        autoPlay>
          <source src={Banner} type='video/mp4'/>
        </video>
      </div>

      {/* Code Secition 1 */}
      <div>
        <CodeBlock
          position={"lg:flex-row"}
          heading={
            <div>
              Unlock Your
              <HighlightText text={"coding potential"} />
              with our online courses
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          btn1={
            {
              active:true,
              text:"Try it yourself",
              linkto:"/signup",
            }
          }
          btn2={
            {
              active:false,
              text:"learn more",
              linkto:"/login",
            }
          }
          codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>\nExample</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
          codeColor={"text-yellow-25"}
        />
      </div>
      
      {/* Code Secition 2 */}
      <div>
        <CodeBlock
          position={"lg:flex-row-reverse"}
          heading={
            <div>
              Start
              <HighlightText text={"coding in seconds"} />
            </div>
          }
          subheading={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          btn1={
            {
              active:true,
              text:"Continue lessons",
              linkto:"/signup",
            }
          }
          btn2={
            {
              active:false,
              text:"learn more",
              linkto:"/login",
            }
          }
          codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>\nExample</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
          codeColor={"text-yellow-25"}
        />
      </div>
    </div>


    {/* Section 2 */}

    {/* Section 3 */}

    {/* Section 4 */}


    </div>
  )
}

export default Home