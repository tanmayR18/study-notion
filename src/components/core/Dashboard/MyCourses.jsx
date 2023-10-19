import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import IconBtn from '../../common/IconBtn'
import { VscAdd } from 'react-icons/vsc'
import CourseTable from './InstructorCourses/CourseTable'

const MyCourses = () => {

    const { token } = useSelector( state => state.auth)
    const navigate = useNavigate()
    const [course, setCourse] = useState([])

    const fetchCourses = async () => {
        const result = await fetchInstructorCourses(token)
        if(result) {
            setCourse(result)
        }
    }
    

    useEffect( () => {
        fetchCourses()
        console.log(course)
    }, [])

  return (
    <div>
        <div className=' mb-14 flex items-center justify-between '>
            <h1 className=' text-3xl font-medium text-richblack-5'>
                My Courses
            </h1>
            <IconBtn 
                customClasses={"px-2 py-2"}
                text={"Add Course"}
                onclick={ () => navigate("/dashboard/add-course")}
            >
                <VscAdd/>
            </IconBtn>
        </div>
        {
            course &&
            <CourseTable course = {course} setCourse = {setCourse} />
        }
    </div>
  )
}

export default MyCourses