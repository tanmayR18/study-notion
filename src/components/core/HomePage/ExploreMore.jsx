import React, { useState } from 'react'
import HighlightText from './HighlightText'
import {HomePageExplore} from '../../../data/homepage-explore'
import CourseCard from './CourseCard';

const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabName[0])
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCard = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }

  return (
    <div className='flex flex-col items-center'>
        <div className='text-4xl font-semibold text-center'>
            Unlock the
            <HighlightText text={"Power of code"} direction={"bg-gradient-to-b"} gradient={" from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"} />
        </div>
        <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'>
            Learn to build anything you can imagine
        </p>
        <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblue-100
        px-1 py-1 w-fit'>
            {
                tabName.map( (element, index) => (
                    <div className={`text-[16px] flex flex-row items-center gap-2
                    ${
                        currentTab === element ?
                        "bg-richblack-900 text-richblack-5 font-medium" :
                        "text-richblack-200"
                    }
                    rounded-full transition-all duration-200 cursor-pointer
                    hover:text-richblack-5 px-7 py-2`
                    }
                    // removed this => hover:bg-richblack-900
                    key={index}
                    onClick={()=> setMyCard(element)}
                    >
                     {element}
                    </div>
                ))
            }
        </div>

        {/* <div className='lg:h-[150px]'></div> */}
        {/* course card ka group */}
        <div className='flex flex-row gap-10 justify-between w-full translate-y-16'>
            {
                courses.map((element, index) => (
                    <CourseCard
                        key={index}
                        cardData={element}
                        currentCard = {currentCard}
                        setCurrentCard = {setCurrentCard}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default ExploreMore