import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { delete_profile } from '../../../../services/operations/settingsApi';
import { RiDeleteBin5Line } from "react-icons/ri";

function DeleteProfile() {
    const [confirmationModal,setConfirmationModal] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    function deleteHandler(){
        setConfirmationModal({
            text1:"Delete Account",
            text2:"Deleting your account will remove all the contain associated with it.",
            btn1Text:"Cancel",
            btn2Text:"Delete",
            btn1Handler:()=>setConfirmationModal(null),
            btn2Handler:()=>dispatch(delete_profile({token,navigate}))
        })
    }
  return (
    <div className=' bg-pink-900 flex flex-row gap-4 py-4 pl-4 rounded-md mb-20 border-[1px] border-pink-600'>
        <div className='bg-pink-700 w-10 h-10 rounded-full flex flex-row justify-center items-center'>
            <RiDeleteBin5Line size={25} className='text-pink-300'></RiDeleteBin5Line>
        </div>
        <div className='text-white'>
            <h3 className='font-bold'>Delete Account</h3>
            <p className='text-xs text-pink-50 mt-2'>Would you like to delete account?</p>
            <p className='text-xs text-pink-50 w-[60%] mt-1' >This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
            <button onClick={deleteHandler} className='text-sm  text-pink-200 mt-2'>
                I want to delete my account.
            </button>
            {
                confirmationModal &&
                <ConfirmationModal confirmationModal={confirmationModal} ></ConfirmationModal>
            }
        </div>
    </div>
  )
}

export default DeleteProfile