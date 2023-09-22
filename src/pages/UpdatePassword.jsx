import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'
import Spinner from '../components/common/Spinner'
import {BiArrowBack} from "react-icons/bi"
import {BsFillCheckCircleFill} from "react-icons/bs"
import { passswordConditions } from '../data/password-conditions'

export const UpdatePassword = () => {

    const {loading} = useSelector( state => state.auth)
    const [passwordUpdated, setPasswordUpdated] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })

    const changeHandler = (e) => {
        setFormData( prevState => (
            {
                ...prevState,
                [e.target.name] : e.target.value
            }
        ))
    }
    
    const submitHandler = (event) => {
        event.preventDefault()
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(formData.password, formData.confirmPassword, token, setPasswordUpdated))
    }

  return (
    <div>
        {
            loading ?
            <Spinner/> : 

            <div className=' flex justify-center h-[calc(100vh-56px)] items-center'>
                <div className=' flex w-[30%] flex-col gap-3 justify-center  text-white'>
                    <h1 className=' text-richblack-5 text-3xl font-semibold'>
                        {
                            passwordUpdated ? "Reset Complete!" : "Choose new Password"
                        }
                    </h1>
                    <p className=' text-lg font-normal text-richblack-100'>
                        {
                            passwordUpdated ? 
                            `All done! We have sent an email to confirm` : 
                            "Almost done. Enter you new password and you are all set."
                        }
                    </p>
                    {
                        !passwordUpdated &&
                        <form 
                        className=' flex flex-col gap-5'
                        onSubmit={submitHandler}>
                            <label className=' relative font-normal  text-sm text-richblack-5'>
                                <p className=' my-1'>New Password<span className=' text-pink-300'>*</span></p>
                                <input
                                    className='text-white border-b w-full border-b-richblack-400 bg-richblack-700 focus:outline-none p-3 rounded-md placeholder:text-richblack-200'
                                    required
                                    placeholder='Enter new password'
                                    type = {`${showPassword ? "text" : "password"}`}
                                    value={formData.password}
                                    onChange={changeHandler}
                                    name='password'
                                />
                                <span
                                className='absolute right-3 top-[38px]  z-[10] cursor-pointer text-white'
                                onClick={ () => setShowPassword( prevState => !prevState)}>
                                    {
                                        showPassword ? <AiFillEyeInvisible size={20}/> : <AiFillEye size={20}/>
                                    }
                                </span>
                            </label>

                            <label className=' relative font-normal  text-sm text-richblack-5'>
                                <p className=' my-1'>Confirm Password<span className=' text-pink-300'>*</span></p>
                                <input
                                    className='text-white border-b w-full border-b-richblack-400 bg-richblack-700 focus:outline-none p-3 rounded-md placeholder:text-richblack-200'
                                    required
                                    placeholder='Enter confirm password'
                                    type = {`${showConfirmPassword ? "text" : "password"}`}
                                    value={formData.confirmPassword}
                                    onChange={changeHandler}
                                    name='confirmPassword'
                                />
                                <span 
                                className=' absolute top-[38px]   right-3   z-[10] cursor-pointer text-white'
                                onClick={ () => setShowConfirmPassword( prevState => !prevState)}>
                                    {
                                        showConfirmPassword ? <AiFillEyeInvisible size={20}/> : <AiFillEye size={20}/>
                                    }
                                </span>
                            </label>

                            <div className=' grid grid-cols-2 gap-2'>
                                {
                                    passswordConditions.map( (conditions, index) => (
                                        <div key={index} className=' flex gap-1 text-caribbeangreen-300 items-center'>
                                            <BsFillCheckCircleFill />
                                            <p>{conditions}</p>
                                        </div>
                                    ))
                                }
                            </div>

                            <button
                            className=' w-full  rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900'
                            >
                                Reset Password
                            </button>

                        </form>
                    }

                    {
                        passwordUpdated &&
                        <button
                        className=' w-full  rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900'
                        >
                            Return to login
                        </button>
                    }    
                        
                        <div>
                            <Link to={"/login"}>
                                <div className=' text-richblack-5 text-base font-medium flex items-center  gap-1'>
                                    <BiArrowBack/>
                                    <p className='text-base text-richblack-50'>Back to Login</p>
                                </div>
                            </Link>
                        </div>
                </div>
            </div>
        }
    </div>
  )
}
