import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io"
import { BsChevronDown } from "react-icons/bs"
import IconBtn from '../../common/IconBtn'
import { getCompletedLectures } from '../../../services/operations/courseDetailsAPI'
import { setCompletedLectures } from '../../../slices/viewCourseSlice'

const VideoDetailsSidebar = ({setReviewModal, sideBar, setSideBar}) => {

    const { token } = useSelector(state => state.auth)
    const [ activeStatus, setActiveStatus ] = useState("") 
    const [ videoBarActive, setVideoBarActive ] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { sectionId, subSectionId, courseId } = useParams()
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector( state => state.viewCourse)

    useEffect( () => {
        ;( async() => {
            if(!courseSectionData.length) return
            const currentSectionIndex = courseSectionData.findIndex(
                data => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.
            [currentSectionIndex]?.subSection.findIndex( data => data._id === subSectionId)
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.
            subSection[currentSubSectionIndex]?._id

            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
            setVideoBarActive(activeSubSectionId)

            //to check teh completed videos
            const compltedLec = await getCompletedLectures(courseId, token)
            console.log("completed LEC", compltedLec)
            dispatch(setCompletedLectures(compltedLec))
           
        })()
    },[courseSectionData, courseEntireData, location.pathname])

  return (
    <>
        <div className={`flex h-[calc(100vh-3.5rem)] lg:w-[320px] lg:max-w-[350px] flex-col border-r-[1px] border-b-richblack-700 bg-richblack-800  ${sideBar ? " w-full lg:w-fit" : "w-0 opacity-0 hidden"}`}>
            <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
                <div className=' flex w-full items-center gap-4 justify-between'>
                    <div   
                    onClick={() => {
                        navigate("/dashboard/enrolled-courses")
                    }}
                    className=' flex h-[35px] w-[35px] items-center justify-centerrounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90'
                    title='back'
                    >
                        <IoIosArrowBack size={30} />
                    </div>
                    <IconBtn 
                        text="Add Review"
                        customClasses= "ml-auto lg:text-lg md:text-lg text-sm"
                        onclick={ () => setReviewModal(true)}
                    />
                </div>
                <button
                className=' text-richblack-100 border rounded-md px-4 py-1 self-end lg:text-lg md:text-lg text-sm' 
                onClick={() => setSideBar(false)}>
                    Hide
                </button>
                <div className=' flex flex-col'>
                    <p>{courseEntireData?.courseName}</p>
                    <p className=' text-sm font-semibold text-richblack-500'>
                        {completedLectures?.length} / {totalNoOfLectures}
                    </p>
                </div>
            </div>

            <div className=' mt-5 h-[calc(100vh-5rem)] overflow-y-auto'>
                {
                    courseSectionData.map( (section, index) => (
                        <div 
                        className=' mt-2 cursor-pointer text-sm text-richblack-5'
                        onClick={() => {
                            setActiveStatus(section?._id)
                            console.log(activeStatus)
                        }}
                        key={index}
                        >
                            {/* Section */}
                            <div className=' flex flex-row justify-between bg-richblack-600 px-5 py-4'>
                                <div className=' w-[70%] font-semibold'>
                                    {section?.sectionName}
                                </div>
                                <div className=' flex items-center gap-3'>
                                    {/* <span className="text-[12px] font-medium">
                                        Lession {course?.subSection.length}
                                    </span> */}
                                    <span 
                                    className={`${
                                        activeStatus === section?.sectionName ?
                                        "rotate-0" :
                                        "rotate-180"
                                    }`}
                                    >
                                        <BsChevronDown />
                                    </span>
                                </div>
                            </div>

                            {/* Subsection */}
                            {
                                activeStatus === section?._id && (
                                    <div
                                    onClick={() => setSideBar(false)}
                                    className=' transition-[height] duration-500 ease-in-out'
                                    >
                                        {
                                            section.subSection.map( (topic, i) => (
                                                <div className={` flex gap-3 px-5 py-2 ${
                                                    videoBarActive === topic._id ?
                                                    " bg-yellow-200 font-semibold text-richblack-800" :
                                                    " hover:bg-richblack-900"
                                                }`}
                                                key={i}
                                                onClick={ () => {
                                                    navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                    setVideoBarActive(topic._id)
                                                }}
                                                >
                                                {console.log("Here is the completed lecture array ",completedLectures)}
                                                    <input 
                                                        type='checkbox'
                                                        checked ={completedLectures.includes(topic?._id)}
                                                        onChange={() => {}}
                                                    />
                                                    {topic.title}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default VideoDetailsSidebar