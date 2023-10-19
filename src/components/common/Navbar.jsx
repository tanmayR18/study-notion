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
import { AiOutlineMenu } from "react-icons/ai"
import NavbarSideBar from './NavbarSideBar'
import toast from 'react-hot-toast'


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
    const [ open, setOpen] = useState(false)
    const [currentRoute, setCurrentRoute] = useState("")

    const toggleSideBar = () => setOpen(prev => !prev)

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
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname === "/" ? "" : "bg-richblack-800"} transition-all duration-200`}>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            {/* Image */}
            <Link to={"/"}>
                <img 
                className='w-[160px] h-[42]'
                src={logo} alt='logo' loading='lazy' />
            </Link>

            {/* Nav Links */}
            <nav className=' hidden md:block'>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map( (link, index) => (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? 
                                    (
                                        <div className='relative flex cursor-pointer items-center gap-2 group'>
                                            <p>{link.title}</p>
                                            <RiArrowDropDownLine/>
                                            {/* left-[50%] translate-x-[-50%] translate-y-[30%] top-[-30%] */}
                                            <div className=' invisible absolute left-[50%] top-[50%] z-[1000] w-[200px] translate-x-[-50%] translate-y-[3rem]
                                            group-hover:translate-y-[1.65em] flex flex-col rounded-lg bg-richblack-5
                                             p-4 text-richblack-900 opacity-0 transition-all duration-300
                                              group-hover:opacity-100 group-hover:visible lg:w-[300px]'>

                                            <div className='absolute left-[50%] top-0 translate-x-[80%]
                                            translate-y-[-40%] h-6 w-6 rotate-45 select-none rounded bg-richblack-5'>
                                                
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                            {
                                                subLinks.length ? (
                                                    subLinks.map( (subLink, index) => (
                                                        <Link to={"/catalog/" + subLink.name.split(" ").join("-").toLowerCase()} key={index}>
                                                            <p className=' hover:bg-richblack-50 bg-transparent rounded-lg py-4 px-4 font-semibold'>{subLink.name}</p>
                                                        </Link>
                                                    ))
                                                ) : (<div className='text-richblack-900 text-center'>No data found</div>)
                                            }
                                            </div>
                                            
                                            </div>
                                        </div>
                                    ) :
                                    (
                                        <Link  to={link?.path}>
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
            <div className=' hidden md:flex gap-x-4 items-center text-white'>
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to={"/dashboard/cart"} className='relative'>
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            {
                                totalItems > 0 && (
                                    <span className=' grid place-items-center animate-bounce absolute -top-1 -right-1 bg-yellow-100 text-richblack-900 w-5 h-5 rounded-full'>
                                        <p className=' text-xs'>{totalItems}</p>
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to ="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-[8px]'>
                                Log In
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to ="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-[8px]'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown/>
                }
            </div>
            <button
            onClick={toggleSideBar}
            className=' mr-4 md:hidden'>    
                <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </button>
            
            {
                open && <NavbarSideBar  subLinks={subLinks} currentRoute = {currentRoute} setCurrentRoute = {setCurrentRoute} toggleSideBar = {toggleSideBar} />
            }
        </div>
    </div>
  )
}

export default Navbar