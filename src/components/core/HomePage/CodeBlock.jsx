import React from 'react'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const CodeBlock = ({position, heading, subheading, btn1, btn2, codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between flex-col gap-10`}>
    {/* Section 1 */}
    <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='text-richblack-300 font-bold text-base w-[85%] -mt-3'>
            {subheading}
        </div>

        <div className='flex gap-7 mt-7'>
            <Button active={btn1.active} linkto={btn1.linkto} border={true}>
                <div className='flex gap-2 font-bold items-center'>
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

        <div className=' code-border flex flex-row w-[100%] py-3 lg:w-[470px]  h-fit backdrop-blur-sm border border-richblack-800 bg-richblack-5 bg-opacity-10 rounded-lg sm:text-sm leading-[18px] sm:leading-6 relative  text-[10px] '>
            {backgroundGradient}
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
                <p>13</p>
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