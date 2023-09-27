import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import { useEffect } from 'react'
import Spinner from "../../common/Spinner"
import ProgressBar from '@ramonak/react-progress-bar'

const EnrolledCourse = () => {

    const { token } = useSelector( state => state.auth)

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
    <div className=' text-white'>
        <div className=' text-3xl text-richblack-100 font-medium' >Enrolled Courses</div>
        {
            !enrolledCourses ? 
            <Spinner/> : 
            !enrolledCourses.length > 0 ? 
                <p className=' text-center mt-10 text-lg font-medium tracking-wider'>
                    You haven't enrolled in any course yet
                </p> :

                <div className=' bg-white rounded-lg overflow-hidden'>
                    <div className=' flex  bg-richblack-700 text-richblack-50 text-sm font-medium p-4'>
                        <p className=' w-1/2'>Course Name</p>
                        <p className='w-1/4'>Durations</p>
                        <p className='w-1/4'>Progress</p>
                    </div>
                    {
                        enrolledCourses.map( (course, index) => (
                            <div>
                                <div>
                                    <img className=' h-5 w-5' src={course.thumbnail} />
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div>
                                    {course?.totalDuration}
                                </div>

                                <div>
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