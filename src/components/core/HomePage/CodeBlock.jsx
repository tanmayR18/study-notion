import React from 'react'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const CodeBlock = ({position, heading, subheading, btn1, btn2, codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
    {/* Section 1 */}
    <div className='w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='text-richblack-300 font-bold'>
            {subheading}
        </div>

        <div className='flex gap-7 mt-7'>
            <Button active={btn1.active} linkto={btn1.linkto} border={true}>
                <div className='flex gap-2 items-center'>
                    {btn1.text}
                    <FaArrowRight/>
                </div>
            </Button>

            <Button active={btn2.active} linkto={btn2.linkto} border={true}>
                {btn2.text}
            </Button>
        </div>
    </div>

    {/* Section 2 */}

        <div className='flex flex-row w-[100%] py-4 lg:w-[500px] h-fit backdrop-blur-sm border border-richblack-800 bg-richblack-5 bg-opacity-10 rounded-lg  text-[14px] '>
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>    
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation 
                    sequence={[codeblock,2000,""]}
                    repeat={Infinity}
                    cursor={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block",
                        }
                    }
                    omitDeletionAnimation={true}
                />
            </div>
        </div>

    </div>
  )
}

export default CodeBlock