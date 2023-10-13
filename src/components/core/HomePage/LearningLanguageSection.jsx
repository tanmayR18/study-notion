import React from 'react'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import Compare_with_others from '../../../assets/Images/Compare_with_others.png'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import HighlightText from './HighlightText'
import Button from './Button'


const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
        <div className='flex flex-col gap-5 items-center'>
            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for
                <HighlightText text={"learning for languages"} direction={"bg-gradient-to-b"} gradient={" from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"} />
            </div>
            <div className=' text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-center lg:mt-0 mt-8'>
                <img
                    src={know_your_progress}
                    alt='know_your_progress'
                    className='object-contain  lg:-mr-32'
                />
                <img
                    src={Compare_with_others}
                    alt='Compare_with_others'
                    className='object-contain lg:-mb-10 lg:-mt-0 -mt-12'
                />
                <img
                    src={Plan_your_lessons}
                    alt='Plan_your_lessons'
                    className='object-contain lg:-ml-36 lg:-mt-5 -mt-16'
                />
            </div>
            <div className='w-fit'>
                <Button active={true} linkto={"/signup"}>
                    <div>
                        Learn more
                    </div>
                </Button>
            </div>
        </div>
    </div>  
  )
}

export default LearningLanguageSection