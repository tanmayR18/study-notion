import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import OTPInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'
import { sendOTP, signup } from '../services/operations/authAPI'
import {BiArrowBack} from "react-icons/bi"
import {PiClockCounterClockwiseBold} from "react-icons/pi"

const VerifyEmail = () => {
    const {signupData, loading} = useSelector( state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [otp, setOtp] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType
        } = signupData

       

        dispatch(
            signup(
                accountType,
                firstName,
                lastName, 
                email, 
                password, 
                confirmPassword, 
                otp,
                navigate))
    }

    useEffect(() => {
        if(!signupData){
            // navigate("/signup")
        }
    })

  return (
    <div>
        {
            loading ?
            <Spinner />
            :
            <div className=' flex justify-center items-center min-h-[calc(100vh-56px)]'>
                <div className=' flex flex-col gap-4 lg:w-[30%] md:w-[30%] w-[90%]'>
                    <p className=' font-semibold lg:text-3xl md:text-3xl text-xl text-richblack-5'>Verify Email</p>
                    <p className=' text-richblack-100 font-normal lg:text-lg md:text-lg text-base'>A verification code has been sent to you. Enter the code below</p>
                    <form className=' flex flex-col gap-4' onSubmit={submitHandler}>
                        <OTPInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) =>
                            <input {...props}
                            placeholder='-'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='w-[40px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] font-bold text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50' />}
                            containerStyle={" flex gap-2 justify-center"}

                        />
                        <button 
                        className='rounded-[8px] bg-yellow-50 lg:py-[8px] md:py-[8px] py-[4px] font-bold px-[12px] text-lg text-richblack-900'
                        >
                            Verify Email
                        </button>
                    </form>

                    <div className=' flex justify-between'>
                        <Link to={"/login"}>
                            <div className=' text-richblack-5 text-base font-medium flex items-center  gap-1'>
                                <BiArrowBack/>
                                <p className=' text-base text-richblack-5'>Back to Login</p>
                            </div>
                        </Link>

                        <button 
                        className=' text-blue-100 text-base font-medium flex items-center  gap-1'
                        onClick={() => dispatch(sendOTP(signupData.email))}>
                            <PiClockCounterClockwiseBold/>
                            <p>Resend it</p>
                        </button>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default VerifyEmail