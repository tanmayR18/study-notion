import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { RxCross2 } from "react-icons/rx"
import { setCourse } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import Upload from '../Upload'
import IconBtn from '../../../../common/IconBtn'

const SubSectionModal = ({
    modalData, 
    setModalData,
    add = false,
    view = false,
    edit = false
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { token } = useSelector( state => state.auth)
    const { course } = useSelector( state => state.course)

    useEffect( () => {
        setValue("lectureTitle", modalData.title)
        setValue("lectureDesc", modalData.description)
        setValue("lectureVideo", modalData.videoUrl)
    },[])

    // detect whether the form is updated or not
    const isFormUpdated = () => {
        const currentValue = getValues()
        if(
            currentValue.lectureTitle !== modalData.title ||
            currentValue.lectureDesc !== modalData.description ||
            currentValue.lectureVideo !== modalData.videoUrl 
        ){
            return true
        }
        return false
    }

    //handle the editing of subsection
    const handleEditSubsection = async() => {
        const currentValue = getValues()
        const formData = new FormData()
        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)
        if( currentValue.lectureTitle !== modalData.title){
            formData.append("title", currentValue.lectureTitle)
        }
        if( currentValue.lectureDesc !== modalData.description){
            formData.append("description", currentValue.lectureDesc)
        }
        if( currentValue.lectureVideo !== modalData.videoUrl){
            formData.append("video", currentValue.lectureVideo)
        }

        setLoading(true)
        const result = await updateSubSection( formData, token)
        if(result){
            const updatedCourseContent = course.courseContent.map( section => 
                section._id === modalData.sectionId ? result : section
            )

            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
    }

    const onSubmit = async(data) => {
        if(view) return

        if(edit) {
            if(!isFormUpdated()){
                toast.error("No chages made to the form")
            } else {
                handleEditSubsection()
            }
            return
        }

        const formData = new FormData()
        // Maybe this should be there
        // formData.append("sectionId", modalData.sectionId) 
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc )
        formData.append("video", data.lectureVideo)

        setLoading(true)
        const result = await createSubSection(formData, token)
        if(result) {
            //update the structure of course
            const updatedCourseContent = course.courseContent.map( section => 
                section._id === modalData ? result : section
            )
            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
    }

  return (
    <div className=' fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className=' my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
            {/* Modal Header */}
            <div className=' flex items-center justify-between rounded-t-lg bg-richblack-800 p-5'>
                <p className=' text-xl font-semibold text-richblack-5'>
                    {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
                </p>
                <button onClick={ () => !loading ? setModalData(null): {}}>
                    <RxCross2 className=" text-2xl text-richblack-5" />
                </button>
            </div>
            {/* Modal Form */}
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className=' space-y-8 px-8 py-8'
            >
                {/* Lecture Video Upload */}
                <Upload 
                    name={"lectureVideo"}
                    label={"Lecture Video"}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null}
                />
                {/* Lecture Title */}
                <div className=' flex flex-col space-y-2'>
                    <label className=' text-sm text-richblack-5 ' htmlFor='lectureTile'>
                        Lecture Title {!view && <sup className=' text-pink-200'>*</sup>}
                    </label>
                    <input 
                        disabled = {view || loading}
                        id='lectureTitle'
                        placeholder='Enter Lecture Title'
                        {...register("lectureTitle", {required: true})}
                        className='form-style w-full'
                    />
                    {
                        errors.lectureTitle && (
                            <span className=' ml-2 text-xs tracking-wide text-pink-200'>
                                Lecture title is required
                            </span>
                        )
                    }
                </div>

                {/* Lecture description */}
                <div className=' flex flex-col space-y-2'>
                    <label className=' text-sm text-richblack-5 ' htmlFor='lectureDesc'>
                        Lecture Description {!view && <sup className=' text-pink-200'>*</sup>}
                    </label>
                    <textarea 
                        disabled = {view || loading}
                        id='lectureDesc'
                        placeholder='Enter Lecture Description'
                        {...register("lectureDesc", {required: true})}
                        className='form-style w-full resize-x-none min-h-[130px]'
                    />
                    {
                        errors.lectureDesc && (
                            <span className=' ml-2 text-xs tracking-wide text-pink-200'>
                                Lecture Description is required
                            </span>
                        )
                    }
                </div>
                
                {
                    !view && 
                    <div className=' flex justify-end'>
                        <IconBtn 
                            disable={loading}
                            text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                        />
                    </div>
                }

            </form>
        </div>
    </div>
  )
}

export default SubSectionModal