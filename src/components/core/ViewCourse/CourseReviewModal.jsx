import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ReactStars from "react-rating-stars-component"
import { useSelector } from 'react-redux'
import { createRating } from '../../../services/operations/courseDetailsAPI'
import IconBtn from '../../common/IconBtn'
const CourseReviewModal = ({ setReviewModal }) => {

    const { user } = useSelector( state => state.profile)
    const { token } = useSelector( state => state.auth)
    const { courseEntireData } = useSelector( state => state.viewCourse)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    useEffect( () => {
        setValue("courseExperience", "")
        setValue("courseRating", 0)  
    },[])

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating)
    }

    const onSubmit = async ( data ) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience
            },
            token
        )
        setReviewModal(false)
    }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="my-10 p-6 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
            {/* Modal Header */}
            <div className=''>
                <div className="flex items-center justify-center gap-x-4">
                <img
                    src={user?.image}
                    alt={user?.firstName + "profile"}
                    className="aspect-square w-[50px] rounded-full object-cover"
                    />
                    <div>
                        <p className=' font-semibold text-richblack-5'>
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-richblack-5">Posting Publicly</p>
                    </div>
                </div>
            </div>
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
            >
                <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
                />
                <div className="flex w-11/12 flex-col space-y-2">
                <label
                    className="text-sm text-richblack-5"
                    htmlFor="courseExperience"
                >
                    Add Your Experience <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    id="courseExperience"
                    placeholder="Add Your Experience"
                    {...register("courseExperience", { required: true })}
                    className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.courseExperience && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Please Add Your Experience
                    </span>
                )}
                </div>
                <div className="mt-6 flex w-11/12 justify-end gap-x-2">
                <button
                    onClick={() => setReviewModal(false)}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    Cancel
                </button>
                <IconBtn text="Save" />
                </div>
            </form>
        </div>  
    </div>
  )
}

export default CourseReviewModal