import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../common/Spinner'
import { FaRegEdit } from "react-icons/fa";
function MyProfile() {
  const {user,loading: profileLoading} = useSelector((state)=>state.profile)

  if(profileLoading){
    return(
      <div>
        <Spinner></Spinner>
      </div>
    )
  }
  if(!user){
    return;
  }
  return (
    <div>
      <div>
        <h1 className='text-4xl text-white'>My Profile</h1>
      </div>

      {/* section 1 */}
      <div className='flex flex-row justify-between bg-richblack-800 w-[50vw] items-center py-4 px-4 rounded-md ml-20 mt-14 border-[1px] border-richblack-600'>
        {/* left Part */}
        <div className='flex flex-row items-center gap-4'>
          <img src={user?.image} className='aspect-square rounded-full w-16'></img>
          <div className='flex flex-col'>
            <h2 className='text-white'>{user?.firstName}</h2>
            <p className='text-sm text-richblack-300 '>{user?.email} </p>
          </div>
        </div>
        {/* Right part */}
        <div >
          <button className='bg-yellow-100 px-4 flex gap-1 flex-row items-center py-2 text-black rounded-md text-sm font-bold'>
            <FaRegEdit className='font-bold' size={17}></FaRegEdit>
            Edit
          </button>
        </div>
      </div>


      {/* Section 2 */}
      <div className='w-[50vw] ml-20 mt-6 bg-richblack-800 px-4 pt-6 rounded-md pb-6 border-[1px]  border-richblack-600'>
        <div className='flex flex-row justify-between '>
          <h2 className='text-white'>Personal Details</h2>
          <button className='bg-yellow-100 px-4 py-2 text-black flex gap-1 flex-row items-center rounded-md text-sm font-bold'>
            <FaRegEdit className='font-bold' size={17}></FaRegEdit>
            Edit
          </button>
        </div>
        <div className='grid grid-cols-2 gap-y-6 mt-4'>
          <div className='flex flex-col '>
            <p className='text-xs text-richblack-500 '>First Name</p>
            <p className='text-sm text-white mt-1 font-bold'>{user?.firstName}</p>
          </div>
          <div className='flex flex-col '>
            <p className='text-xs text-richblack-500'>Last Name</p>
            <p className='text-sm text-white mt-1 font-bold'>{user?.lastName}</p>
          </div>
          <div className='flex flex-col'>
            <p className='text-xs text-richblack-500 '>Email</p>
            <p className='text-sm text-richblack-500 mt-1 font-bold'>{user?.email}</p>
          </div>
          <div className='flex flex-col '>
            <p className='text-xs text-richblack-500 '>Phone Number</p>
            <p className='text-sm text-white mt-1 font-bold'>{user?.additionalDetails?.phoneNumber ? (user?.additionalDetails?.phoneNumber):(1234567890)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile