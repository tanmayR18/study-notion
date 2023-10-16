import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { addCourseDetails, editCourseDetials, fetchCouseCategories } from '../../../../../services/operations/courseDetailsAPI'
import toast from 'react-hot-toast'
import { setCourse, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constant'
import ChipInput from './ChipInput'
import Upload from '../Upload'
import RequirementField from './RequirementField'
import IconBtn from '../../../../common/IconBtn'


const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors}
    } = useForm()

    const dispatch = useDispatch()
    const { token } = useSelector( state => state.auth)
    const { course, editCourse } = useSelector( state => state.course)
    const [ loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])

    const getCategories = async () => {
        setLoading(true)
        const categories = await fetchCouseCategories()
        if( categories.length > 0){
            setCourseCategories(categories)
        }
        setLoading(false)
    }

    useEffect( () => {
        getCategories()

        //if form is in edit mode
        if(editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
    }, [])

    const isFormUpdated = () => {
        const currenValues = getValues()
        if(
            currenValues.courseTitle !== course.courName ||
            currenValues.courseShortDesc !== course.courseDescription ||
            currenValues.coursePrice !== course.price ||
            currenValues.courseTags.toString() !== course.tag.toString() ||
            currenValues.courseBenefites !== course.whatYouWillLearn ||
            currenValues.courseCategory._id !== course.courName._id ||
            currenValues.courseRequirements.toString() !== course.instructions.toString() ||
            currenValues.courseImage !== course.thumbnail 
        ){
            return true;
        }

        return false
    }

    //handle next button click
    const onSubmit = async (data) => {
        
        if(editCourse) {
            if(isFormUpdated()){
                const currenValues = getValues()
                const formData = new FormData()

                formData.append("courseId", course._id)
                if( currenValues.courseTitle !== course.courName){
                    formData.append("courseName", data.courseTitle)
                }
                if(currenValues.courseShortDesc !== course.courseDescription){
                    formData.append('courseDescription', data.courseShortDesc)
                }
                if(currenValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice)
                }
                if(currenValues.courseTags.toString() !== course.tag.toString()){
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if(currenValues.courseBenefites !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if(currenValues.courseCategory._id !== course.category._id ){
                    formData.append("category", data.courseCategory)
                }
                if(
                    currenValues.courseRequirements.toString() !==
                    course.instructions.toString()
                ){
                    formData.append(
                        "instructions",
                        JSON.stringify(data.courseRequirements),
                    )
                }
                if(currenValues.courseImage !== course.thumbnail){
                    formData.append("thumbnailImage", data.courseImage)
                }
                setLoading(true)
                const result = await editCourseDetials(formData, token)
                setLoading(false)
                if(result){
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
            } else {
                toast.error("No changes made to the form")
            }
            return
        }


        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)

        setLoading(true)
        const result = await addCourseDetails(formData, token)
        if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoading(false)
    }


  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className=' space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-6 lg:p-6'
    >   
        {/* Course Title */}
        <div className=' flex flex-col space-y-2'>
            <label className=' text-sm text-richblack-600' htmlFor='courseTitle'>
                Course Title <sup className=' text-pink-200'>*</sup>
            </label>
            <input  
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register('courseTitle',{ required: true })}
                className='form-style  w-full'
            />
            {
                errors.courseTitle && (
                    <span className=' ml-2 text-xs tracking-wide text-pink-200'>
                        Course title is required
                    </span>
                )
            }
        </div>

        {/* Course Short descriptiom */}
        <div className=' flex flex-col space-y-2'>
            <label className=' text-sm text-richblack-600' htmlFor='courseShortDesc'>
                Course Short Desciption <sup className=' text-pink-200'>*</sup>
            </label>
            <textarea  
                id='courseShortDesc'
                placeholder='Enter Course Description'
                {...register('courseShortDesc',{ required: true })}
                className='form-style w-full resize-x-none min-h-[130px] '
            />
            {
                errors.courseShortDesc && (
                    <span className=' ml-2 text-xs tracking-wide text-pink-200'>
                        Course Desctiption is required
                    </span>
                )
            }
        </div>

        {/* COurse Price */}
        <div className=' flex flex-col space-y-2'>
            <label className=' text-sm text-richblack-600' htmlFor='coursePrice'>
                Course Price <sup className=' text-pink-200'>*</sup>
            </label>
           <div className=' relative'>
                <input  
                    id='coursePrice'
                    placeholder='Enter Course Price'
                    {...register('coursePrice',{ 
                            required: true,
                            valueAsNumber: true,
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            }
                        })}
                    className='form-style w-full !pl-12'
                />
                <HiOutlineCurrencyRupee className=' absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400' />
           </div>
            {
                errors.courseTitle && (
                    <span className=' ml-2 text-xs tracking-wide text-pink-200'>
                        Course title is required
                    </span>
                )
            }
        </div>

        {/* Course Category */}
        <div className=' flex flex-col space-y-2'>
            <label className=' text-sm text-richblack-600' htmlFor='courseCategory'>
                Course Category <sup className=' text-pink-200'>*</sup>
            </label>
            <select
                {...register("courseCategory", {required: true})}
                defaultValue = ""
                id = "courseCategory"
                className = "form-style w-full"
            >
                <option value= "" disabled>
                    Choose a Catagory
                </option>
                {
                    !loading && 
                    courseCategories?.map( (category, index) => (
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    )) 
                }
            </select>
            {
                errors.courseCategory && (
                    <span className=' ml-2 text-xs tracking-wide text-pink-200'>
                        Course Catagory is required
                    </span>
                )
            }
        </div>

        {/* COurse Tags */}
        <ChipInput 
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags and press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValue={getValues}
        />

        {/* Course Thumbnail Image */}
        <Upload 
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={ editCourse ? course?.thumbnail : null}
        />

        {/* Benefits of the course */}
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
            Benefits of the course <sup className="text-pink-200">*</sup>
            </label>
            <textarea
            id="courseBenefits"
            placeholder="Enter benefits of the course"
            {...register("courseBenefits", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.courseBenefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
                Benefits of the course is required
            </span>
            )}
        </div>

        {/* Requirement field */}
        <RequirementField 
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            setValue={setValue}
            error={errors}
            getValues={getValues}
        />

        {/* Next Button */}
        <div className=' flex justify-end gap-x-2'>
            {
                editCourse && (
                    <button 
                        onClick={() => dispatch(setStep(2))}
                        disabled={loading}
                        className=' flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] font-semibold text-richblack-900'
                    >   
                        Continue withou saving
                    </button>
                )
            }
            <IconBtn 
                disable={loading}
                text={editCourse? "Save Changes" : "Next"}
            >
                <MdNavigateNext />
            </IconBtn>
        </div>
    </form>
  )
}

export default CourseInformationForm