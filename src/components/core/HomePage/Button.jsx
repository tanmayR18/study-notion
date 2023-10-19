import React from 'react'
import { NavLink } from 'react-router-dom'

const Button = ({active, linkto, children, border}) => {
  return (
    <NavLink to={linkto}>
        <div className={`text-center border-b-2 border-r-2 ${border ? "border-richblack-600" : "border-none"} text-[16px] lg:px-6 px-3 lg:py-3 py-2 rounded-md font-bold
        ${active ? "bg-yellow-50 text-black ":" bg-richblack-800"}
        hover:scale-95 hover:border-none transition-all duration-200`}>
            {children}
        </div>
    </NavLink>
  )
}

export default Button