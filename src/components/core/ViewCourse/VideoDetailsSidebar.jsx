import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const VideoDetailsSidebar = () => {

    const [ activeStatus, setActiveStatus ] = useState("") 
    const [ videoBarActive, setVideoBarActive ] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const { sectionId, subSectionId } = useParams()
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector( state => state.viewCourse)

    useEffect( () => {
        ;( () => {
            if(!courseSectionData.length) return
            const currentSectionIndex = courseSectionData.findIndex(
                data => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.
            [currentSectionIndex]?.subSection.findIndex( data => data._id === subSectionId)
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.
            subSection[currentSubSectionIndex]?._id

            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
            setVideoBarActive(activeSubSectionId)
        })()
    },[courseSectionData, courseEntireData, location.pathname])

  return (
    <div>
        
    </div>
  )
}

export default VideoDetailsSidebar