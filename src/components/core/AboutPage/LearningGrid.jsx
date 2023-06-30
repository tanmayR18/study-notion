import React from 'react'
import {LearningGridArray} from '../../../data/learningGrid'
import HighlightText from '../HomePage/HighlightText'
import Button from '../HomePage/Button'

const LearningGrid = () => {
  return (
    <div className='grid grid-col-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
    {
        LearningGridArray.map( (card, index) => (
            <div
            key={index}
            className={`${index === 0 && "lg:col-span-2"}
            ${
                card.order % 2 === 1 ? "bg-richblack-700":"bg-richblack-800"
            }
            ${card.order === 3 && "lg:col-start-2"}
            ${card.order < 0 && "bg-transparent"}
            lg:h-[280px] p-5
            `}
            >

                {
                    card.order < 0 ?
                    (
                        <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                            <div className='text-4xl font-semibold '>
                                {card.heading}
                                <HighlightText text={card.highlightText} />
                            </div>
                            <p className='font-medium'>
                                {card.description}
                            </p>
                            <div className='w-fit mt-4'>
                                <Button active={true} linkto={card.BtnLink} >
                                    {card.BtnText}
                                </Button>
                            </div>
                        </div>
                    ) :
                    (
                        <div className='flex flex-col gap-8 p-7'>
                            <h1 className='text-richblack-5 text-lg'>
                                {card.heading}
                            </h1>
                            <p className='text-richblack-300 font-medium'>
                                {card.description}
                            </p>
                        </div>
                    )
                }

            </div>
        ))
    }
    </div>
  )
}

export default LearningGrid