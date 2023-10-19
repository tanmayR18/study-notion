import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import {RiArrowDropDownLine} from "react-icons/ri"
import { useClickAway } from 'react-use'
import { AnimatePresence, motion } from 'framer-motion'

const NavbarSideBar = ({ toggleSideBar, setCurrentRoute, currentRoute, subLinks }) => {

    const ref = useRef(null)
    useClickAway( ref, () => toggleSideBar())


  return (
    <motion.div 
    {...framerSidebarBackground}
    className='fixed top-0 right-0 left-0 bottom-0  h-screen z-40  bg-[rgba(0,0,0,0.1)]  backdrop-blur-sm text-white'>
        <motion.div 
        {...framerSidebarPanel}
        ref={ref} className=' fixed top-0 right-0 z-50 h-screen  p-5  bg-richblack-400 bg-opacity-50'>
            {/* Nav Links */}
            <div className=' lg:hidden md:hidden'>
                <ul className='flex flex-col gap-6 text-richblack-25'>
                    {
                        NavbarLinks.map( (link, index) => (
                            <li className=' border-b border-richblack-400 pb-2' key={index}>
                                {
                                    link.title === "Catalog" ? 
                                    (
                                        <div className='relative flex flex-col cursor-pointer group'>
                                            <div className='flex gap-1 items-center'>
                                                <p>{link.title}</p>
                                                <RiArrowDropDownLine/>
                                            </div>
                                            {/* left-[50%] translate-x-[-50%] translate-y-[30%] top-[-30%] */}
                                            {/* <div className='absolute left-[50%] top-0 translate-x-[80%]
                                            translate-y-[-40%] h-6 w-6 rotate-45 select-none rounded bg-richblack-5'>
                                                
                                            </div> */}

                                            <div className='flex flex-col mt-2 pl-3 gap-2'>
                                            {
                                                subLinks.length ? (
                                                    subLinks.map( (subLink, index) => (
                                                        <Link onClick={() => toggleSideBar()} to={"/catalog/" + subLink.name.split(" ").join("-").toLowerCase()} key={index}>
                                                            <p className=' '>{subLink.name}</p>
                                                        </Link>
                                                    ))
                                                ) : (<div className=' text-white text-center'>No data found</div>)
                                            }
                                            </div>
                                            
                                        </div>
                                    ) :
                                    (
                                        <Link to={link?.path}>
                                            {/* <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p> */}
                                            <p 
                                            onClick={ () => {
                                                toggleSideBar()
                                                setCurrentRoute(link?.path)
                                            }}
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
            </div>
            <div className='mt-4 flex justify-end  text-sm' onClick={() => toggleSideBar()}>
                    <p className=' bg-richblack-500 px-3 py-1'>Close</p>
            </div>
        </motion.div>
    </motion.div>
  )
}

const framerSidebarBackground = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { delay: 0.2 } },
    transition: { duration: 0.3 },
  }
  
  const framerSidebarPanel = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { duration: 0.3 },
  }

export default NavbarSideBar