import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import {FiUpload} from "react-icons/fi"
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"

const ChangeProfilePicture = () => {

    const { token } = useSelector( state => state.auth)
    const { user } = useSelector( state => state.profile)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)

    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        // console.log('file', file);
        if(file){
            setImageFile(file)
            previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = () => {
        try{
            console.log("uploading...")
            setLoading(true)
            const formData = new FormData()
            formData.append("displayPicture", imageFile)
            console.log("formData", formData)
            dispatch(updateDisplayPicture(token, formData))
                .then(() => setLoading(false))
            setLoading(false)
        } catch(error){
            console.log("Error Message", error.message)
        }
    }

    useEffect( () => {
        if(imageFile){
            previewFile(imageFile)
        }
    }, [imageFile])

  return (
    <div>
        <div className=' flex items-center justify-between rounded-md border[1px] border-richblack-700 bg-richblack-800 lg:p-8 md:p-8 p-4 px-6 md:px-12 lg:px-12 text-richblack-5'>
            <div className=' flex items-center gap-x-4'>
                <img 
                    src={previewSource || user?.image}
                    alt={`profile-${user?.firstName}`}
                    className=' aspect-square lg:w-[78px] md:w-[78px] w-[40px] rounded-full object-cover'
                />
                <div className=' space-y-2'>
                    <p className=' lg:text-base md:text-base text-sm'>Change Profile Picture</p>
                    <div className=' flex flow-row gap-3'>
                        <input 
                            type='file'
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className='hidden'
                            accept='image/png, image/gif, image/jpeg'
                        />
                        <button
                            onClick={handleClick}
                            disabled={loading}
                            className=' cursor-pointer rounded-md bg-richblack-700 lg:py-2 md:py-2 lg:px-5 md:px-5 px-2 py-1 font-semibold text-richblack-5'
                        >
                            Select
                        </button>
                        <IconBtn 
                            customClasses={"px-2 py-2"}
                            disable={loading || !imageFile}
                            text={loading ? "Uploading..." : "Upload"}
                            onclick={handleFileUpload}
                        >
                            {
                                !loading && (
                                    <FiUpload className=" text-lg text-richblack-900" />
                                )
                            }
                        </IconBtn>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangeProfilePicture