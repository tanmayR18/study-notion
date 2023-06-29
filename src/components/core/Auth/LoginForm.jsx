import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import {login} from "../../../services/operations/authAPI"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        "email":"",
        "password":""
    })

    const [showPassword, setShowPassword] = useState(false)

    const {email, password} = formData

    const handleOnChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]:event.target.value
        }))
    }

    const handleOnSubmit = (event) => {
        event.preventDefault()
        
        dispatch(login(email,password,navigate))
    }

  return (
    <form 
    onSubmit={handleOnSubmit}
    className='mt-6 flex w-full flex-col gap-y-4'>
        <label className='w-full'>
            <div className='mb-1 text-[0.875rem] loading-[1.375rem] text-richblack-5'>
                Email Address <sup className='text-pink-200'>*</sup>
            </div>
            <input
                required
                type='text'
                name='email'
                value={email}
                onChange={handleOnChange}
                placeholder='Enter email address'
                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",}}
                className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
        </label>

        <label className='relative'>
            <div className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                Password <sup className='text-pink-200'>*</sup>
            </div>
            <input 
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange} 

                placeholder={"Enter the Password"}
                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",}}
                className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
            <span 
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute right-3 top-[38px] z-[10] cursor-pointer text-richblack-5 opacity-80 text-[24px]'
            >
                {
                    showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye  />
                }
            </span>
            <Link to={"/forgot-password"}>
                <p className='mt-1 ml-auto max-w-max text-sm text-blue-100'>
                    Forgot Password
                </p>
            </Link>
        </label>
        <button
        type='submit'
        className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'
        >
            Sign In
        </button>
    </form>
  )
}

export default LoginForm