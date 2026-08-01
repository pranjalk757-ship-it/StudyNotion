import React, { useRef, useState } from 'react'
import { VscDashboard } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from '../../../hook/useOnClickOutside'
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authApi';
function ProfileDropDown() {
  const {user} = useSelector((state)=> state.profile);
  const [open,setOpen] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useOnClickOutside(ref,()=>(setOpen(false)));

  function signoutHandler(){
    dispatch(logout({navigate}));
    setOpen(false);
  }
  return (
    <button onClick={()=>setOpen(true)}>
      <div
       className='flex flex-row justify-center items-center  gap-2 relative' 
      >
        <img src={user?.image} className='aspect-square rounded-full w-6'></img>
        <AiOutlineCaretDown className='text-richblack-200' size={15}></AiOutlineCaretDown>
      </div>
      {
        open && (
          <div
            onClick={(e)=>e.stopPropagation()}
            ref={ref}
            className='flex flex-col gap-4 absolute bg-richblack-800 text-richblack-5 top-14 right-10 px-4 py-2'

          >

            <Link to='/dashboard/my-profile' 
              className='flex flex-row items-center font-bold gap-2'
              onClick={()=>setOpen(false)}
            >
                  <VscDashboard></VscDashboard>
                  Dashboard
            </Link>

            <div
             onClick={signoutHandler}
             className='flex flex-row items-centerfont-bold gap-2'
            >
              <VscSignOut className='bg-richblack-'></VscSignOut>
              Sign Out
            </div>
          </div>
        )
      }
    </button>
  )
}

export default ProfileDropDown