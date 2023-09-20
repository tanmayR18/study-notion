import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import OTPInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'
import { sendOTP } from '../services/operations/authAPI'

const VerifyEmail = () => {
    const {signupData, loading} = useSelector( state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [opt, setOtp] = useState("")

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

        // dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, navigate))
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
            <div>
                <p>Verify Email</p>
                <p>A verification code has been sent to you. Enter the code below</p>
                <form onSubmit={submitHandler}>
                    <OTPInput 
                        value={opt}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} className=' bg-richblack-600' />}
                    />
                    <button>
                        Verify Email
                    </button>
                </form>

                <div>
                    <div>
                        <Link to={"/login"}>
                            <p>Back to Login</p>
                        </Link>
                    </div>

                    <button onClick={() => dispatch(sendOTP(signupData.email))}>
                        Resend it
                    </button>
                </div>
            </div>
        }
    </div>
  )
}

export default VerifyEmail