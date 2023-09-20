import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import {BiSolidQuoteLeft, BiSolidQuoteRight} from "react-icons/bi"

const Quote = () => {
  return (
    <div className=' py-20 mt-20 text-4xl w-10/12 mx-auto font-bold'>
        <center className=''>
            <BiSolidQuoteLeft className=' text-richblack-600'/>
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <HighlightText text={"Combine Technology"} direction={"bg-gradient-to-b"} gradient={" from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"} />
            <HighlightText text={"expertise"} direction={"bg-gradient-to-b"} gradient={" from-[#FF512F] to-[#F09819]"} />
            , and community to create and
            <HighlightText text={"unparalleled educational experience."} direction={"bg-gradient-to-b"} gradient={" from-[#E65C00] to-[#F9D423]"} />
            <BiSolidQuoteRight className=' text-richblack-600'/>
        </center>
    </div>
  )
}

export default Quote