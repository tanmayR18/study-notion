import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'
import Spinner from '../../../common/Spinner'
import RenderSteps from '../AddCourse/RenderSteps'

const EditCourse = () => {

    const dispatch = useDispatch()
    const { courseId } = useParams()
    const { course } = useSelector( state => state.course)
    const [ loading, setLoading ] = useState(false)
    const { token } = useSelector( state => state.auth)

    useEffect( () => {
        (
            async() => {
                setLoading(true)
                console.log("Course Id", courseId)
                const result = await getFullDetailsOfCourse(courseId, token)
                if( result?.courseDetails){
                    dispatch(setEditCourse(true))
                    dispatch(setCourse(result?.courseDetails))
                }
                setLoading(false)
            }
        )()
    },[])

  return (
    <div>
        {
            loading ?
            <Spinner/> : 
            <div>
                <h1 className=' mb-14 text-3xl font-medium text-richblack-5'>
                    Edit Course
                </h1>
                <div className=' mx-auto max-w-[600px]'>
                    {
                        course ? 
                        <RenderSteps /> : 
                        <p className='mt-14 text-center text-3xl font-semibold text-richblue-100'>
                            Course not found
                        </p>
                    }
                </div>
            </div>
        }
    </div>
  )
}

export default EditCourse