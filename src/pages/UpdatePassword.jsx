import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'

export const UpdatePassword = () => {

    const {loading} = useSelector( state => state.auth)
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
        dispatch(resetPassword(formData.password, formData.confirmPassword, token))
    }

  return (
    <div>
        {
            loading ?
            <div>Loading...</div> : 

            <div className=' text-white'>
                <h1>Choose new Password</h1>
                <p>Almost done. Enter you new password and you are all set.</p>
                <form onSubmit={submitHandler}>
                    <label className=' text-black'>
                        <input 
                            required
                            type = {`${showPassword ? "text" : "password"}`}
                            value={formData.password}
                            onChange={changeHandler}
                            name='password'
                        />
                        <span
                        className=' text-white'
                        onClick={ () => setShowPassword( prevState => !prevState)}>
                            {
                                showPassword ? <AiFillEyeInvisible/> : <AiFillEye/>
                            }
                        </span>
                    </label>

                    <label className=' text-black'>
                        <input 
                            required
                            type = {`${showConfirmPassword ? "text" : "password"}`}
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            name='confirmPassword'
                        />
                        <span 
                        className=' text-white'
                        onClick={ () => setShowConfirmPassword( prevState => !prevState)}>
                            {
                                showConfirmPassword ? <AiFillEyeInvisible/> : <AiFillEye/>
                            }
                        </span>
                    </label>

                    <button>
                        Reset Password
                    </button>

                    <div>
                        <Link to={"/login"}>
                            <p>Back to Login</p>
                        </Link>
                    </div>

                </form>
            </div>
        }
    </div>
  )
}
