import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../../../services/operations/SettingsAPI'
import {AiOutlineEyeInvisible,  AiOutlineEye} from "react-icons/ai"
import IconBtn from '../../../common/IconBtn'

const UpdatePassword = () => {
    const { token } = useSelector( state => state.auth)
    const navigate = useNavigate()

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitPasswordForm = async (data) => {
        try{
            await changePassword(token, data)
        } catch(error){
            console.log("ERROR MESSAGE", error.message)
        }
    }

  return (
    <>
        <form onSubmit={handleSubmit(submitPasswordForm)}>
            <div className=' my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 lg:p-8 md:p-8 p-4 lg:px-12 md:px-12'>
                <h2 className=' text-lg font-semibold text-richblack-600'>Password</h2>
                <div className=' flex flex-col gap-5 lg:flex-row '>
                    <div className='relative flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='newPassword' className='label-style'>
                            New Password
                        </label>
                        <input 
                            type={showNewPassword ? "text" : "password"}
                            name='newPassword'
                            id='newPassword'
                            placeholder='Enter New Password'
                            className='form-style'
                            {...register("newPassword",{required: true})}
                        />
                        <span 
                            onClick={() => setShowNewPassword( prev => !prev)}
                            className=' absolute right-3 top-[55%] z-[10] cursor-pointer'
                        >
                            {showNewPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> 
                            ) :
                            <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
                        </span>
                        {
                            errors.newPassword && (
                                <span className=' -mt-1 text-[12px] text-yellow-100'>
                                    Please enter your new password
                                </span>
                            )
                        }
                    </div>

                    <div className='relative flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='confirmPassword' className='label-style'>
                            Confirm Password
                        </label>
                        <input 
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            id='confirmPassword'
                            placeholder='Enter Confirm Password'
                            className='form-style'
                            {...register("confirmPassword",{required: true})}
                        />
                        <span 
                            onClick={() => setShowConfirmPassword( prev => !prev)}
                            className=' absolute right-3 top-[55%] z-[10] cursor-pointer'
                        >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> 
                            ) :
                            <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
                        </span>
                        {
                            errors.confirmPassword && (
                                <span className=' -mt-1 text-[12px] text-yellow-100'>
                                    Please enter  confirm password
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                    navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>
                <IconBtn customClasses={"py-2 px-5"} type="submit" text="Update" />
            </div>
        </form>
    </>
  )
}

export default UpdatePassword