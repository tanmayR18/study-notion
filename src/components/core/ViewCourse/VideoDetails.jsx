import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsCompleted } from '../../../services/operations/courseDetailsAPI'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice'
import { BigPlayButton, Player } from 'video-react'
import IconBtn from '../../common/IconBtn'
import "video-react/dist/video-react.css"
import { LoaderIcon } from 'react-hot-toast'

const VideoDetails = () => {
    
    const { courseId, sectionId, subSectionId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const playerRef = useRef(null)
    const dispatch = useDispatch()
    const { token } = useSelector( state => state.auth)
    const {
        courseSectionData, courseEntireData, completedLectures
    } = useSelector( state => state.viewCourse)
    const [ videoData, setVideoData ] = useState("")
    const [ previewSource, setPreviewSource ] = useState("")
    const [ videoEnded, setVideoEnded ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    useEffect( () => {
        ;( async() => {
            if(!courseSectionData.length) return
            if(!courseId && !sectionId && !subSectionId) {
                navigate("/dashboard/enrolled-courses")
            } else {
                const filteredData = courseSectionData.filter(
                    course => course._id === sectionId
                )

                const filteredVideoData = filteredData?.[0]?.subSection.filter(
                    data => data._id === subSectionId
                )

                console.log("THis is the filtered video data", filteredVideoData)

                setVideoData(filteredVideoData?.[0])
                setPreviewSource(courseEntireData.thumbnail)
                setVideoEnded(false)
            }
        })()
    }, [ courseSectionData, courseEntireData, location.pathname])

    // check if the lecture is the first video of the course
    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            data => data._id === sectionId
        )

        const currentSubSectionIndex = courseSectionData[
            currentSectionIndex
        ].subSection.findIndex( data => data._id === subSectionId)

        if( currentSectionIndex === 0 && currentSubSectionIndex === 0){
            return true
        } else {
            return false
        }
    }

    // check if the lecture is the last video of the course
    const isLastVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
          (data) => data._id === sectionId
        )
    
        const noOfSubsections =
          courseSectionData[currentSectionIndx].subSection.length
    
        const currentSubSectionIndx = courseSectionData[
          currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)
    
        if (
          currentSectionIndx === courseSectionData.length - 1 &&
          currentSubSectionIndx === noOfSubsections - 1
        ) {
          return true
        } else {
          return false
        }
    }

    // go to next video
    const gotoNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            data => data._id === sectionId
        )

        const noOfSubSections = 
            courseSectionData[currentSectionIndex].subSection.length

        const currentSubSectionIndex = courseSectionData[
            currentSectionIndex
        ].subSection.findIndex( data => data._id === subSectionId)

        if(currentSubSectionIndex !== noOfSubSections - 1){
            const nextSubSectionId = 
                courseSectionData[currentSectionIndex].subSection[
                    currentSubSectionIndex + 1
                ]._id
                navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }else{
            // what is the user is on the last lecture(subsection) of the last section
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
            const nextSubSectionId = 
                courseSectionData[currentSectionIndex + 1].subSection[0]._id
            navigate(
                `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            )
        }

    }

    // go to previous video
    const goToPrevVideo = () => {
        console.log("Yaha taak toh aagagya")
        const currentSectionIndex = courseSectionData.findIndex(
            data => data._id === sectionId
        )

        const currentSubSectionIndex = courseSectionData[
            currentSectionIndex
        ].subSection.findIndex( data => data._id === subSectionId)

        if(currentSubSectionIndex !== 0) {
            const prevSubSectionId = 
                courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id
                navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        } else {
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id
            const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[
                prevSubSectionLength - 1
            ]._id
            navigate(
                `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            )

        }
    }

    const handleLectureCompletion = async () => {
        setLoading(true)
        const res = await markLectureAsCompleted(
            {courseId: courseId, subSectionId: subSectionId},
            token
        )
        
        if(res) {
            dispatch(updateCompletedLectures(subSectionId))
        }
        setLoading(false)
    }


  return (
    <div className=' flex flex-col gap-5 text-white'>
        {
            !videoData ? (
                <img 
                    src={previewSource}
                    alt='Preview'
                    className=' h-full w-full rounded-md object-cover'
                /> 
            ) : (
                <Player 
                    ref={playerRef}
                    aspectratio='16:9'
                    playsInline
                    onEnded = { () => setVideoEnded(true)}
                    src={videoData?.videoUrl}
                >
                    <BigPlayButton position='center' /> 
                    {/* Render when video ends */}
                    {
                        videoEnded && (
                            <div 
                            style={{
                                backgroundImage:
                                "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                            }}
                            className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                            >
                                {
                                    !completedLectures.includes(subSectionId) && (
                                        <IconBtn 
                                            disable={loading}
                                            onclick={() => handleLectureCompletion()}
                                            text={!loading ? "Marks as completed" : "Loading"}
                                            customClasses=" text-xl max-w-max px-4 mx-auto"
                                        />
                                    )
                                }
                                <IconBtn 
                                    disable={loading}
                                    onclick={() => {
                                        if( playerRef?.current) {
                                            // set the current time of the video to 0
                                            playerRef?.current?.seek(0)
                                            setVideoEnded(false)
                                        }
                                    }}
                                    text="Rewatch"
                                    customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                                />

                                <div className=' mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl'>
                                    {
                                        !isFirstVideo() && (
                                            <button  
                                                disabled = {loading}
                                                onClick={goToPrevVideo}
                                                className='blackButton'
                                            >
                                                Prev
                                            </button>
                                        )
                                    }
                                    {
                                        !isLastVideo() && (
                                            <button
                                            disabled = {loading}
                                            onClick={gotoNextVideo}
                                            className='blackButton'
                                            >
                                                Next
                                            </button>
                                        )
                                    }
                                </div>      
                            </div>
                        )
                    }
                </Player>
            )
        }

        <h1 className=' mt-4 text-3xl font-semibold'>{videoData?.description}</h1>
        <p className=' pt-2 pb-6'>{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails