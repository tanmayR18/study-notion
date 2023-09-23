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
        className={` flex items-center ${
            outline ? " border border-yellow-50 bg-transparent" : " bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900  ${customClasses}`}
        type={type}
        >
            {
                children ?
                <div>
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