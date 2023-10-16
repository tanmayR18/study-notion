import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from '../../../../common/ConfirmationModal'

import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"

const NestedView = ({ handleChangedEditSectionName }) => {

    const { course } = useSelector( state => state.course)
    const { token } = useSelector( state => state.auth)
    const dispatch = useDispatch()
    
    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)

    const [confirmationModal, setConfirmationModal] = useState(null)

    const handleDeleteSection = async(sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token,
        })
        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    const handleDeleteSubSection = async( subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId}, token)
        if(result){
            //update the structure of course
            const updatedCourseContent = course.courseContent.map( section => 
                section._id === sectionId ? result : section 
            )
            console.log("Updated section after deleting subSection", updatedCourse)
            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null)
    }


  return (
    <>
        <div 
        className=' rounded-lg bg-richblack-700 p-6 px-8'
        id='nestedViewContainer'
        >
            {
                course?.courseContent?.map( section => (
                    // Section dropDown
                    <details key = {section._id} open>
                        {/* Section dropDown content */}
                        <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>
                            <div className=' flex items-center gap-x-3'>
                                <RxDropdownMenu className = "text-2xl text-richblack-50" />
                                <p className=' font-semibold text-richblack-50 w-20 lg:w-48 overflow-x-clip'>
                                    {section.sectionName}
                                </p>
                            </div>
                            {/* Edit and delete button */}
                            <div className=' flex items-center gap-x-3'>
                                <button
                                onClick={ () => 
                                handleChangedEditSectionName(
                                    section._id,
                                    section.sectionName
                                )}
                                >
                                    <MdEdit className = " text-xl text-richblack-300 " />
                                </button>

                                <button 
                                onClick={() => 
                                    setConfirmationModal({
                                        text1: "Delete this Section?",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null)
                                    })
                                }
                                >
                                    <RiDeleteBin6Line className = "text-xl text-richblack-300 " />
                                </button>
                                <span className="font-medium text-richblack-300">|</span>
                                <AiFillCaretDown className={`text-xl text-richblack-300`} />
                            </div>
                        </summary>
                        
                        <div className=' px-6 pb-4'>
                            {/* Render All SUb Sections within a section */}
                            {
                                section.subSection.map( data => (
                                    <div 
                                    key={data?._id}
                                    onClick={ () => setViewSubSection(data)}
                                    className=' flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'
                                    >
                                        <div className="flex items-center gap-x-3 py-2 ">
                                            <RxDropdownMenu className="text-2xl text-richblack-50" />
                                            <p className="font-semibold text-richblack-50 w-20 lg:w-48 overflow-x-clip">
                                            {data.title}
                                            </p>
                                        </div>

                                        {/* edit and delete button */}
                                        <div 
                                        className=' flex items-center gap-x-3'
                                        onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                            onClick={ () => setEditSubSection({...data, sectionId: section._id}) }
                                            >
                                                <MdEdit className="text-xl text-richblack-300" />
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setConfirmationModal({
                                                        text1:"Delete this Sub-Section?",
                                                        text2: "This lecture will be deleted",
                                                        btn1Text : 'Deleted',
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                        btn2Handler: () => setConfirmationModal(null)
                                                    })
                                                }}
                                            >
                                                <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

                            {/* Add new lecture to section */}
                            <button
                            onClick={() => setAddSubSection(section._id)}
                            className=' mt-3 flex items-center gap-x-1 text-yellow-50'
                            >
                                <FaPlus className = "text-lg" />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))
            }
        </div>
        {/* Modal Display */}
        {
            addSubSection ? (
                <SubSectionModal 
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                    add={true}
                />
            ) : viewSubSection ? (
                <SubSectionModal 
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />
            ) : editSubSection ? (
                <SubSectionModal 
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />
            ) : (<></>)
        }
        {/* COnfirmation MOdal */}
        {
            confirmationModal &&
            <ConfirmationModal modalData={confirmationModal} />
        }
    </>
  )
}

export default NestedView