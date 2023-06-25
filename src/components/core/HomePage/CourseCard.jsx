import React from 'react'
import {HiMiniUsers} from 'react-icons/hi2'
import {ImTree} from 'react-icons/im'

const CourseCard = ({currentCard, setCurrentCard, cardData}) => {
  return (
    <div className='h-[300px] w-[100%]'>
        <div className={`flex flex-col justify-between bg-richblack-800
         h-full text-richblack-25`}>
            <div className='flex flex-col gap-7 py-8 px-6'>
                <p className='text-[20px] font-semibold'>{cardData.heading}</p>
                <p className='text-richblack-400 leading-6 text-[16px]'>{cardData.description}</p>
            </div>
            <div className='flex justify-between  py-8 px-6'>
                <div className='flex gap-3 items-center'>
                    <HiMiniUsers/>
                    <p>{cardData.level} </p>

                </div>
                <div className='flex gap-3 items-center'>
                    <ImTree/>
                    <p>{cardData.lessionNumber} Lessons</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CourseCard