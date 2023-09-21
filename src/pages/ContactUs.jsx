import React from 'react'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import {IoMdChatbubbles} from "react-icons/io"
import {BsGlobeCentralSouthAsia, BsFillTelephoneFill} from "react-icons/bs"
import ContactUsForm from '../components/ContactPage/ContactUsForm'
import Footer from '../components/common/Footer'

const ContactUs = () => {
  return (
    <div>
        {/* Upper section */}
        <div className=' text-white w-11/12 mx-auto py-24 flex flex-col gap-8  lg:flex-row justify-between'>
            <div className=' flex flex-col gap-12 bg-richblack-800 h-fit p-6 w-full lg:w-5/12 items-start rounded-2xl'>
                <div className=' flex gap-2'>
                    <IoMdChatbubbles size={25} className=' text-richblack-100' />
                    <div>
                        <p className=' text-richblack-5 text-[18px] font-semibold'>Chat on us</p>
                        <p className=' text-richblack-200 text-sm'>Our friendly team is here to help.</p>
                        <p  className=' text-richblack-200 text-sm font-semibold' >@mail address</p>
                    </div>
                </div>

                <div className=' flex gap-2'>
                    <BsGlobeCentralSouthAsia size={25} className=' text-richblack-100' />
                    <div>
                        <p className=' text-richblack-5 text-[18px] font-semibold'>Visit us</p>
                        <p className=' text-richblack-200 text-sm'>Come and say hello at our office HQ.</p>
                        <p className=' text-richblack-200 text-sm font-semibold'> Here is the location/ address</p>
                    </div>
                </div>

                <div className=' flex gap-2'>
                    <BsFillTelephoneFill size={25} className=' text-richblack-100' />
                    <div>
                        <p className=' text-richblack-5 text-[18px] font-semibold'>Call us</p>
                        <p className=' text-richblack-200 text-sm'>Mon - Fri From 8am to 5pm</p>
                        <p className=' text-richblack-200 text-sm font-semibold'>+123 456 7890</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2 p-12 border border-blue-700 rounded-2xl '>
                <h1 className=' font-semibold text-[36px] text-richblack-5'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                <p className='mb-10 text-richblack-300'>Tall us more about yourself and what you’re got in mind.</p>
            <ContactUsForm/>
            </div>
        </div>

        {/* Review section */}

        <Footer/>
    </div>
  )
}

export default ContactUs