import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import {RiArrowDropDownLine} from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { useEffect } from 'react'
import { useState } from 'react'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'


// const subLinks = [
//     {
//         title: "Python",
//         link: "/catalog/python"
//     },
//     {
//         title: "Web Development",
//         link: "/catalog/web-development"
//     },
//     {
//         title: "AL/ML",
//         link: "/catalog/ai-ml"
//     }
// ]

const Navbar = () => {

    const location = useLocation()
    const {token} = useSelector( (state) => state.auth)
    const {user} = useSelector( (state) => state.profile)
    const {totalItems} = useSelector( (state) => state.cart)
    const [subLinks, setSubLinks] = useState([])
    const [currentRoute, setCurrentRoute] = useState("")

    const fetchAllCategories = async () => {
        try{
            const response = await apiConnector("GET", categories.CATEGORIES_API)
            setSubLinks(response.data.data)
        } catch(error) {
            console.error(error)
        }
    }

    useEffect( () => {
        fetchAllCategories()
        // matchRoute()
    },[])

    //THis function is rendering multiple times
    // const matchRoute = (route) => {
    //     console.log("Inside matchRoute")
    //     return matchPath({path:route}, location.pathname)
    // }

    // const matchRoute = () => {
    //     setCurrentRoute(location.pathname)
    // }

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
                                             translate-y-[30%] top-[-30%] group-hover:translate-y-[20%] group-hover:top-[-20%] flex flex-col rounded-md bg-richblack-5
                                             p-4 text-richblack-900 opacity-0 transition-all duration-200
                                              group-hover:opacity-100 group-hover:visible lg:w-[300px] z-10'>

                                            <div className='absolute left-[50%] top-0 translate-x-[80%]
                                            translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>

                                            </div>

                                            <div className='flex flex-col gap-2'>
                                            {
                                                subLinks.length ? (
                                                    subLinks.map( (subLink, index) => (
                                                        <Link to={subLink.name.split(" ").join("-").toLowerCase()} key={index}>
                                                            <p className=' hover:bg-richblack-25 rounded-md py-4 px-4 font-semibold'>{subLink.name}</p>
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
                                            {/* <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p> */}
                                            <p 
                                            onClick={ () => setCurrentRoute(link?.path)}
                                            className={`${currentRoute === link?.path ? "text-yellow-25" : "text-richblack-25"}`}>
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

            {/* Login/Signup/Dashboard */}
            <div className='flex gap-x-4 items-center'>
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to={"/dashboard/cart"} className='relative'>
                            <AiOutlineShoppingCart/>
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to ="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Log In
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to ="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown/>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar