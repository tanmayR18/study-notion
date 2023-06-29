import React from 'react'
import { SignupForm } from './SignupForm'
import LoginForm from './LoginForm'
import { useSelector } from 'react-redux'
import Spinner from '../../common/Spinner'
import frameImg from '../../../assets/Images/frame.png'

const Template = ({title, description1, description2, image, formType }) => {
    const {loading} = useSelector( (state) => state.auth)
  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        {
            loading ? 
            <Spinner/> :
            <div className=' mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12'>
                <div className='mx-auto w-11/12 max-w-[450px] md:mx-0'>
                    <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                        {title}
                    </h1>
                    <p className='mt-4 text-[1.125rem] leading-[1.625rem]'>
                        <p className='text-richblack-100'>{description1}</p>
                        <p className=' font-edu-sa  italic text-blue-100'>{description2}</p>
                    </p>
                    {formType === "signup" ? <SignupForm/> : <LoginForm></LoginForm>}
                </div>
                {/* width and height of the image removed */}
                <div className='relative mx-auto w-11/12 max-w-[450px] md:mx-0'>
                    <img src={frameImg}  alt='Pattern' loading='lazy' />
                    <img src={image} className=' absolute -top-4 right-4 z-10' alt='Pattern' loading='lazy' />
                </div>
            </div>
        }

    </div>
  )
}

export default Template