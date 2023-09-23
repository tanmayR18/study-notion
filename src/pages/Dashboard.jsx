import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import SideBar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {

    const {loading: profileLoading} = useSelector( state => state.profile)
    const {loading: authLoading} = useSelector(state => state.auth)

    if(profileLoading || authLoading){
        return (
            <Spinner/>
        )
    }

  return (
    <div className=' text-white relative flex min-h-[calc(100vh-3.5rem)]'>
        <SideBar/>
        <div className='min-h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
            <div className=' mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard