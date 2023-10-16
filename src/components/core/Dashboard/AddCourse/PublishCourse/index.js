import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { COURSE_STATUS } from '../../../../../utils/constant'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import { editCourseDetials } from '../../../../../services/operations/courseDetailsAPI'
import IconBtn from '../../../../common/IconBtn'

const PublishCourse = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues
    } = useForm()


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector( state => state.auth)
    const { course } = useSelector( state => state.course)
    const [ loading, setLoading ] = useState(false)

    useEffect( () => {
        if( course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true)
        }
    }, [])

    const goBack = () => {
        dispatch(setStep(2))
    }

    const goToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async () => {
        //check if form has been updated or not
        if(
            (course?.status === COURSE_STATUS.PUBLISHED &&
            getValues("public") === true) ||
            (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false )
        ){
            // form has not been updated
            // no need to make an api call
            goToCourses()
            return
        }

        const formData = new FormData()
        formData.append("courseId", course._id)
        const courseStatus = getValues("public") ?
        COURSE_STATUS.PUBLISHED :
        COURSE_STATUS.DRAFT
        formData.append("status", courseStatus)
        setLoading(true)
        const result = await editCourseDetials(formData, token)
        if(result) {
            goToCourses()
        }
        setLoading(false)
    }

    const onSubmit = (data) => {
        //        console.log({ data })
        handleCoursePublish()
    }

  return (
    <div className=' rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-6 lg:p-6 mb-10'>
        <p className=' text-2xl font-semibold text-richblack-5'>
            Public Settings
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Checkbox */}
            <div className=' my-6 mb-8'>
                <label htmlFor='public' className=' inline-flex items-center text-base md:text-lg lg:text-lg'>
                    <input 
                        type='checkbox'
                        id='public'
                        {...register("public")}
                        className=' border-pure-greys-300 h-4 w-4 rounded bg-richblack-500 text-richblack-500 focus:ring-2 focus:ring-richblack-5'
                    />
                        <span className=' ml-2 text-richblack-400'>
                            Make this course as public
                        </span>
                </label>
            </div>

            {/* Next Prev Button */}
            <div className=' ml-auto flex max-w-max items-center gap-x-4'>
                <button 
                    disabled = {loading}
                    type='button'
                    onClick={goBack}
                    className=' flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 px-4 py-1 lg:py-[8px] lg:px-[20px] font-semibold text-richblack-800'
                >
                    Back
                </button>
                <IconBtn disable={loading} text="Save Changes" />
            </div>
        </form>
    </div>
  )
}

export default PublishCourse
