import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import SideBar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import {AiOutlineArrowRight} from "react-icons/ai"

const Dashboard = () => {

    const {loading: profileLoading} = useSelector( state => state.profile)
    const {loading: authLoading} = useSelector(state => state.auth)
    const [ sideBar, setSideBar] = useState(false) 

    if(profileLoading || authLoading){
        return (
            <Spinner/>
        )
    }

  return (
    <div className=' text-white relative flex lg:flex-row flex-col min-h-[calc(100vh-3.5rem)]'>
        <SideBar setSideBar={setSideBar} sideBar={sideBar}/>
        <button 
        className={` text-richblack-100 text-3xl pt-1 pl-5  mt-10  ${sideBar ? "hidden" : "self-start"} flex`}
        onClick={() => setSideBar(true)}
        >
            <AiOutlineArrowRight />
        </button>
        <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto '>
            <div className={`' mx-auto ${sideBar ? "lg:block lg:pt-10 hidden w-0 lg:w-11/12" : "w-11/12 pt-10"} max-w-[1000px] py-10'`}>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard