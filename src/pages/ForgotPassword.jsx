import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authAPI'
import Spinner from "../components/common/Spinner"
import {BiArrowBack} from "react-icons/bi"

const ForgotPassword = () => {

    const {loading} = useSelector( state => state.auth)
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()

    function handleOnSubmit(event){
        event.preventDefault()
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

  return (
    <div>
        {
            loading ?
            <Spinner/>
            :
            <div className=' flex justify-center h-[calc(100vh-56px)] items-center'>
                <div className=' text-white w-[30%]  flex flex-col gap-3 justify-center'>
                    <h1 className=' font-bold text-3xl text-richblack-5'>
                        {
                            emailSent ? "Check Your Email" : "Reset your Password "
                        }
                    </h1>
                    <p className=' text-richblack-100 font-normal text-lg'>
                        {
                            emailSent ?
                            `We have sent the reset email to ${email}` :
                            "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                        }
                    </p>

                    <form
                    className=' flex flex-col gap-3'
                    onSubmit={handleOnSubmit}>
                        {
                            !emailSent &&
                            <label className=' font-normal  text-sm text-richblack-5'>
                                <p className=' my-1'>Email Address<span className=' text-pink-300'>*</span></p>
                                <input 
                                    className='text-white border-b w-full border-b-richblack-400 bg-richblack-700 focus:outline-none p-3 rounded-md placeholder:text-richblack-200'
                                    required
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your Email address'
                                />
                            </label>
                        }

                        <button
                        className='rounded-[8px] bg-yellow-50 py-[8px] font-bold px-[12px] text-lg text-richblack-900' 
                        type='submit'>
                        {
                            emailSent ?
                            "Resend Email":
                            "Reset Password"
                        }
                    </button>
                    </form>

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

export default ForgotPassword