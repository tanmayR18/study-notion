import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import {AiOutlineArrowRight} from "react-icons/ai"

const ViewCourse = () => {

    const { courseId } = useParams()
    const { token } = useSelector( state => state.auth)
    const dispatch = useDispatch()
    const [ reviewModal, setReviewModal ] = useState(false)
    const [ sideBar, setSideBar ] = useState(false)

    useEffect( () => {
        ;(async () => {
            const courseData = await getFullDetailsOfCourse( courseId, token)
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos))
            let lectures = 0
            courseData?.courseDetails?.courseContent?.forEach( sec => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))
        })()
    })

  return (
    <>
        <div className=' relative flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]'>
            <VideoDetailsSidebar sideBar={sideBar} setSideBar={setSideBar} setReviewModal = {setReviewModal} />
            <button 
            className={` text-richblack-100 text-3xl pt-1 pl-5  mt-10  ${sideBar ? "hidden" : "self-start"} flex`}
            onClick={() => setSideBar(true)}
            >
                <AiOutlineArrowRight />
            </button>
            <div className=' h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                <div className={` ml-4 md:ml-6 lg:ml-6 ${sideBar ? "lg:block lg:pt-10 hidden w-0 lg:w-11/12" : "w-11/12 pt-10"}`}>
                    <Outlet/>
                </div>
            </div>
        </div>
        { reviewModal && <CourseReviewModal setReviewModal = {setReviewModal} />}
    </>
  )
}

export default ViewCourse