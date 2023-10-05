import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'

const CourseDetails = () => {

    const { user } = useSelector(state => state.profile)
    const { token } = useSelector( state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { courseId } = useParams()

    const handleBuyCourse = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch)
        }
    }

  return (
    <div className=' flex items-center'>
        <button 
        onClick={handleBuyCourse}
        className=' bg-yellow-50 px-4 py-2 mt-10'>
            Buy now
        </button>
    </div>
  )
}

export default CourseDetails