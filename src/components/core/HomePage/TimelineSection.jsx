import React from 'react'

import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const TimelineSection = () => {
    const timeline = [
        {
            logo:logo1,
            heading:"Leadership",
            description:"Fully committed to the success company"
        },
        {
            logo:logo2,
            heading:"Responsibility",
            description:"Students will always be our top priority"
        },
        {
            logo:logo3,
            heading:"Flexibility",
            description:"The ability to switch is an important skills"
        },
        {
            logo:logo4,
            heading:"Solve the problem",
            description:"Code your way to a solution"
        },
    ]
  return (
    <div>
        <div className='flex flex-col  lg:flex-row gap-10 lg:gap-0 items-center'>
            <div className='lg:w-[45%]  w-full flex flex-col gap-10 lg:gap-5'>
                {
                    timeline.map( (element, index) => (
                        <div className='flex flex-row gap-6' key={index}>
                            <div className='w-[50px] h-[50px] bg-white flex justify-center rounded-full items-center'>
                                <img src={element.logo} alt='logo'/>
                            </div>
                            <div>
                                <h2 className=' font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='relative z-20  shadow-blue-200 shadow-[0px_0px_30px_0px]'>

                <div className=' lg:block hidden w-full h-full absolute  shadow-blue-200 shadow-[0px_0px_30px_0px] bg-white z-10 -bottom-5 -right-5'>
                    
                </div>
                
                <img src={timelineImage} 
                alt='timelineImage'
                className='shadow-white object-cover h-fit relative z-20'
                />

                <div className=' absolute z-20 bg-caribbeangreen-700 flex gap-2 lg:flex-row flex-col text-white uppercase lg:py-7 md:py-7 py-1
                left-[50%] translate-x-[-50%] lg:translate-y-[-50%] md:translate-y-[-50%] translate-y-[-40%]'>
                    <div className='flex flex-row gap-5   lg:border-r border-caribbeangreen-300 px-7'>
                        <p className='lg:text-3xl md:text-3xl text-base font-bold'>10</p>
                        <p className=' text-caribbeangreen-300 lg:text-sm md:text-sm text-xs'>Years of Experience</p>
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                        <p className='lg:text-3xl md:text-3xl text-base font-bold'>95</p>
                        <p className=' text-caribbeangreen-300  lg:text-sm md:text-sm text-xs'>Type of Courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>  
  )
}

export default TimelineSection