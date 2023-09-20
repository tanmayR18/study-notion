import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authAPI'

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
            <div>

            </div>
            :
            <div className=' text-white flex flex-col justify-center'>
                <h1>
                    {
                        emailSent ? "Check Your Email" : "Reset your Password "
                    }
                </h1>
                <p>
                    {
                        emailSent ?
                        `We have sent the reset email to ${email}` :
                        "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                    }
                </p>

                <form onSubmit={handleOnSubmit}>
                    {
                        !emailSent &&
                        <label>
                            <p>Email Address</p>
                            <input 
                                required
                                type='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your Email address'
                            />
                        </label>
                    }

                    <button className=' cursor-pointer' type='submit'>
                    {
                        emailSent ?
                        "Resend Email":
                        "Reset Password"
                    }
                </button>
                </form>

                <div>
                    <Link to={"/login"}>
                        <p>Back to Login</p>
                    </Link>
                </div>
            </div>
        }
    </div>
  )
}

export default ForgotPassword