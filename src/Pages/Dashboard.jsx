import React from 'react'
import Sidebar from '../components/cors/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../components/cors/common/Spinner';

function Dashboard() {
    const {loading: authLoading} = useSelector((state)=>state.auth);
    const {loading: profileLoading} = useSelector((state)=>state.profile);
    if(authLoading || profileLoading){
        <div>
            <Spinner></Spinner>
        </div>
    }
  return (
    <div className='flex flex-row' >
        <div className='bg-richblack-800 h-[calc(100vh-3.1rem)] w-[15%] pt-8 fixed top-[3.1rem]'>
            <Sidebar></Sidebar>
        </div>
        <div className='w-[85%] overflow-y-auto ml-[16%] mt-[5%] pb-20'>
            <Outlet></Outlet>
        </div>
    </div>
  )
}

export default Dashboard