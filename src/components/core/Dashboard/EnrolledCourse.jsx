import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import { useEffect } from 'react'
import Spinner from "../../common/Spinner"
import ProgressBar from '@ramonak/react-progress-bar'
import { useNavigate } from 'react-router-dom'

const EnrolledCourse = () => {

    const { token } = useSelector( state => state.auth)
    const navigate = useNavigate()
    const [enrolledCourses, setEnrolledCourses] = useState(null)

    const getEnrolledCourses = async() => {
        try{
            const response = await getUserEnrolledCourses(token)
            setEnrolledCourses(response)
        } catch(error){
            console.log("Unable to fetch Enrolled Courses")
        }
    }

    useEffect( () => {
        getEnrolledCourses()
    },[])

  return (
    <div className=''>
        <div className=' text-3xl text-richblack-100 font-semibold mb-5' >Enrolled Courses</div>
        {
            !enrolledCourses ? 
            <Spinner/> : 
            !enrolledCourses.length > 0 ? 
                <p className='grid h-[10vh] w-full place-content-center text-richblack-5'>
                    You haven't enrolled in any course yet
                </p> :

                <div className='flex flex-col rounded-t-lg bg-richblack-500 '>
                    <div className=' flex  bg-richblack-700 text-richblack-50 text-sm font-medium p-4'>
                        <p className='lg:w-[45%] md:w-[45%] w-[35%] px-5 py-3'>Course Name</p>
                        <p className='lg:w-1/4 md:lg:w-1/4 w-[30%] px-2 py-3'>Durations</p>
                        <p className='flex-1 text-center px-2 py-3'>Progress</p>
                    </div>
                    {
                        enrolledCourses.map( (course, i, arr ) => (
                            <div 
                                className={`flex items-center border border-richblack-700 ${
                                    i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                }`}
                                key={i}
                            >
                                <div
                                    className="flex w-[45%] lg:flex-row flex-col  cursor-pointer items-center gap-4 px-5 py-3"
                                    onClick={() => {
                                        console.log("course section", course)
                                    navigate(
                                        `/view-course/${course?._id}/section/${course.courseContent?.[0]._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]}`
                                    )
                                    }}
                                >
                                    <img className=' h-14 w-14 rounded-lg object-cover' alt='course_img' src={course.thumbnail} />
                                    <div className="flex max-w-xs flex-col lg:items-start items-center gap-2">
                                        <p className="font-semibold">{course.courseName}</p>
                                        <p className="text-xs text-richblack-300">{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div className="w-1/4 px-2 py-3">
                                    {course?.totalDuration}
                                </div>

                                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                    <p>Progress: {course.progressPercentage || 0} %</p>
                                    <ProgressBar 
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
        }
    </div>
  )
}

export default EnrolledCourse