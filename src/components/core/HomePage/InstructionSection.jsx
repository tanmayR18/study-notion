import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'


const InstructionSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-col lg:flex-row gap-20 items-center'>
            <div className='lg:w-[50%] bg-white relative z-20'>
                <div className='hidden lg:block bg-white h-full w-full z-10 absolute -left-5 -top-5'>

                </div>
                <img 
                    src={Instructor}
                    alt='instructor'
                    className='z-20 relative '
                />
            </div>
            <div className='lg:w-[50%] flex items-center lg:items-start  flex-col gap-10'>
                <div className='text-4xl text-center lg:text-left font-semibold lg:w-[50%]'>
                    Become an
                    <HighlightText text={"Instructor"} direction={"bg-gradient-to-b"} gradient={" from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"} />
                </div>
                <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>
                <div className='w-fit'>
                    <Button active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2 items-center'>
                            Start Learning Today
                            <FaArrowRight/>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructionSection