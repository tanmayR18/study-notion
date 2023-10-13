import React from 'react'
import {HiMiniUsers} from 'react-icons/hi2'
import {ImTree} from 'react-icons/im'

const CourseCard = ({currentCard, setCurrentCard, cardData}) => {
  return (
    
    <div 
    onClick={() => setCurrentCard(cardData.heading)}
    className='h-[300px] w-[100%] relative cursor-pointer'>

        <div className={`w-full h-full ${cardData.heading === currentCard ? "" : "hidden"} bg-yellow-50 absolute top-3 left-3`}>
        </div>
        <div 
        className={` flex flex-col justify-between 
         h-full  relative ${cardData.heading === currentCard ? "bg-white text-richblack-900" : "bg-richblack-800 text-richblack-25"}`}>
            <div className='flex flex-col lg:gap-7 gap-2 py-8 px-6'>
                <p className='text-[20px] font-bold'>{cardData.heading}</p>
                <p className={` text-richblack-400 leading-6 text-[16px]`}>{cardData.description}</p>
            </div>
            <div className={`flex justify-between  py-8 px-6 border-t-2 ${cardData.heading === currentCard ? "text-richblue-300" : ""}  border-dashed `}>
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