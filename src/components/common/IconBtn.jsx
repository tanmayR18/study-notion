import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disable,
    outline = false,
    customClasses,
    type,
}) => {
  return (
    <div>
        <button
        disabled={disable}
        onClick={onclick}
        className={` flex  items-center ${
            outline ? " border border-yellow-50 bg-transparent" : " bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md lg:py-2 py-1 lg:px-5 px-1 font-semibold text-richblack-900  ${customClasses}`}
        type={type}
        >
            {
                children ?
                <div className=' flex items-center  lg:text-base text-sm  lg:gap-x-2 gap-x-1'>
                    <span className={`${outline && "text-yellow-50"}`}>{text}</span>
                    {children}
                </div> :
                <div>
                    {text}
                </div>
            }
        </button>
    </div>
  )
}

export default IconBtn