import React, { useEffect, useState } from 'react'
import CountryCode from "../../data/countrycode.json"
import { useForm } from 'react-hook-form'

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging data",data)
        try{
            setLoading(true)
            //add the api 
            const response = {status:"OK"};
            console.log("Logging response", response)
            setLoading(false)
        } catch(error) {
            console.log("Error while submiting contact us form",error.message)
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex flex-col gap-14'>
            {/* First and last name */}
            <div className='flex gap-5'>
                {/* firstname */}
                <div className='flex flex-col'>
                <label htmlFor='firstName'>First Name</label>
                <input 
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Enter first name'
                    className='text-black'
                    {...register("firstName",{required:true})}
                />{
                    errors.firstName && (
                        <span>
                            Please enter your first name
                        </span>
                    )
                }
                </div>
                {/* Last Name */}
                <div className='flex flex-col'>
                <label htmlFor='lastName'>Last Name</label>
                <input 
                    type='text'
                    name='lastName'
                    id='lastName'
                    placeholder='Enter last name'
                    className='text-black'
                    {...register("lastName",{required:true})}
                />{
                    errors.lastName && (
                        <span>
                            Please enter your last name
                        </span>
                    )
                }
                </div>
            </div>
            
            {/* email */}
            <div className='flex flex-col'>
                <label htmlFor='email'>Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    className='text-black'
                    placeholder='Enter Email Address'
                    {...register("email", {required:true})}
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* Phone NO */}
            <div className='flex flex-col'>
                <label htmlFor='phonenumber'>Phone Number</label>
                <div className='flex flow-row gap-1'>
                    {/* Dropdown */}
                    <select
                    name='dropdown'
                    id='dropdown'
                    className='bg-yellow-50 w-[80px] '
                    {...register("countrycode",{required:true})}    
                >
                    {
                        CountryCode.map( (element, index) => (
                            <option key={index} value={element.code}>
                                {element.code} -{element.country}
                            </option>
                        ))
                    }
                    
                    </select>
                    <input
                        type='number'
                        name='phonenumber'
                        id='phonenumber'
                        placeholder='12345 67890'
                        className='text-black w-[calc(100%-90px)]'
                        {...register("phoneNo",{
                            required:{value:true, message:"Please enter Phone Number"},
                            maxLength:{value:10, message:"Invalid Phone Number"},
                            minLength:{value:8, message:"Invalid Phone Number"}
                        })}
                    />
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }
            </div>

            {/* message */}
            <div className='flex flex-col'>
                <label htmlFor='message'>Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    className='text-black'
                    rows="7"
                    placeholder='Enter Your message here'
                    {...register("message",{required:true})}
                />
                {
                    errors.message && (
                        <span>
                            Please enter you message
                        </span>
                    )
                }
            </div>

            <button type='submit'
            className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black'>
                Send Message
            </button>
        </div>
    </form>
  )
}
 
export default ContactUsForm