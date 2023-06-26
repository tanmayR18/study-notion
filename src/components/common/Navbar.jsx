import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import {RiArrowDropDownLine} from 'react-icons/ri'



const subLinks = [
    {
        title: "Python",
        link: "/catalog/python"
    },
    {
        title: "Web Development",
        link: "/catalog/web-development"
    },
    {
        title: "AL/ML",
        link: "/catalog/ai-ml"
    }
]

const Navbar = () => {

    const location = useLocation()


    const matchRoute = (route) => {
        console.log("Inside matchRoute",location.pathname)
        return matchPath({path:route}, location.pathname)
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            {/* Image */}
            <Link to={"/"}>
                <img 
                className='w-[160px] h-[42]'
                src={logo} alt='logo' loading='lazy' />
            </Link>

            {/* Nav Links */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map( (link, index) => (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? 
                                    (
                                        <div className=' relative flex items-center gap-2 group'>
                                            <p>{link.title}</p>
                                            <RiArrowDropDownLine/>

                                            <div className=' invisible absolute left-[50%] translate-x-[-50%]
                                             translate-y-[50%] top-[-50%] flex flex-col rounded-md bg-richblack-5
                                             p-4 text-richblack-900 opacity-0 transition-all duration-200
                                              group-hover:opacity-100 group-hover:visible lg:w-[300px] z-10'>

                                            <div className='absolute left-[50%] top-0 translate-x-[80%]
                                            translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>

                                            </div>

                                            <div className='flex flex-col gap-2'>
                                            {
                                                subLinks.length ? (
                                                    subLinks.map( (subLink, index) => (
                                                        <Link to={subLink.link} key={index}>
                                                            <p className=' bg-richblack-300 rounded-md py-1 px-2 font-semibold'>{subLink.title}</p>
                                                        </Link>
                                                    ))
                                                ) : (<div className='text-4xl text-richblack-900'>Not data found</div>)
                                            }
                                            </div>
                                            
                                            </div>
                                        </div>
                                    ) :
                                    (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Navbar