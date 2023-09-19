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
        <div className='flex flex-row gap-15 items-center'>
            <div className='w-[45%] flex flex-col gap-5'>
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

            <div className='relative z-20 shadow-2xl shadow-blue-500'>

                <div className=' w-full h-full absolute bg-white z-10 -bottom-5 -right-5 sha  shadow-blue-500'>
                    
                </div>
                
                <img src={timelineImage} 
                alt='timelineImage'
                className='shadow-white object-cover h-fit relative z-20'
                />

                <div className=' absolute z-20 bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className=' text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className=' text-caribbeangreen-300 text-sm'>Type of Courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>  
  )
}

export default TimelineSection