import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Iconbtn from '../../common/Iconbtn';
import { useDispatch } from 'react-redux';
import { update_password } from '../../../../services/operations/settingsApi';
import { useSelector } from 'react-redux';
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
function ChangePassword() {
    const [oldPassword,setOldPassword] = useState(false);
    const [newPassword,setNewPassword] = useState(false);
    const [confirmNewPassword,setConfirmNewPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.profile);
    const {register,formState:{errors},handleSubmit } = useForm();
    const {token} = useSelector((state)=>state.auth);
    function submitHandler(formData){
        try{
            const email = user?.email;
            dispatch(update_password({token,email,formData}));
            console.log("Password updated successfully")
        }
        catch(err){
            console.log("Error occured in update password submit handler",err);
        }
    }
  return (
    <div className='text-white bg-richblack-800 mt-10 pt-4 px-4 mb-10 pb-4 z-0 rounded-md border-[1px] border-richblack-600'>
        <h2 className='text-white font-bold mb-4'>Password</h2>
        <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-6'>
            <div className='flex flex-col text-xs gap-1 relative w-[60%]'>
                <label htmlFor='oldPassword' className='text-richblack-100 relative w-fit'>Current Password
                    <sup className='text-lg absolute -right-3 mt-1 text-pink-400'>*</sup>
                </label>
                <input
                    type={`${oldPassword ? 'text':'password'}`}
                    name='oldPassword'
                    id='oldPassword'
                    {...register('oldPassword',{required:'current password is required'})}
                    className='bg-richblack-700 shadow-sm shadow-richblack-500  py-2 rounded-md outline-none text-richblack-100 pl-2 z-0'
                ></input>
                <span onClick={()=>setOldPassword(!oldPassword)}
                    className='absolute right-4 mt-7 cursor-pointer'
                >
                    {
                        oldPassword ? 
                        <BsFillEyeSlashFill size={18} className='text-richblack-200'></BsFillEyeSlashFill>
                        :
                        <BsFillEyeFill size={18} className='text-richblack-200'></BsFillEyeFill>
                    }
                </span>
                {
                    errors.oldPassword &&
                    <p className='text-[10px] text-pink-200 pl-2'>{errors.oldPassword.message} ! </p>
                }
            </div>
            <div className='flex flex-col text-xs gap-1 relative w-[60%]' >
                <label htmlFor='newPassword'  className='text-richblack-100 relative w-fit'>New Password
                    <sup className='text-lg absolute -right-3 mt-1 text-pink-400'>*</sup>
                </label>
                <input
                    type={`${newPassword ? 'text':'password'}`}
                    name='newPassword'
                    id='newPassword'
                    className='bg-richblack-700 shadow-sm shadow-richblack-500 py-2 rounded-md outline-none text-richblack-100 pl-2 z-0'
                    {...register('newPassword',{required:'New password is required'})}
                ></input>
                <span onClick={()=>setNewPassword(!newPassword)}
                    className='absolute right-4 mt-7 cursor-pointer'
                >
                    {
                        newPassword ? 
                        <BsFillEyeSlashFill size={18} className='text-richblack-200'></BsFillEyeSlashFill>
                        :
                        <BsFillEyeFill size={18} className='text-richblack-200'></BsFillEyeFill>
                    }
                </span>
                {
                    errors.newPassword &&
                    <p className='text-[10px] text-pink-200 pl-2'>{errors.newPassword.message} ! </p>
                }
            </div>
            <div className='flex flex-col text-xs gap-1 relative w-[60%]'>
                <label htmlFor='confirmNewPassword'  className='text-richblack-100 relative w-fit'>Confirm New Password
                    <sup className='text-lg absolute -right-3 mt-1 text-pink-400'>*</sup>
                </label>
                <input
                    type={`${confirmNewPassword ? 'text':'password'}`}
                    name='confirmNewPassword'
                    id='confirmNewPassword'
                    className='bg-richblack-700 shadow-sm shadow-richblack-500  py-2 rounded-md outline-none text-richblack-100 pl-2 z-0'
                    {...register('confirmNewPassword',{required:'New password is required'})}
                ></input>
                <span onClick={()=>setConfirmNewPassword(!confirmNewPassword)}
                    className='absolute right-4 mt-7 cursor-pointer'
                >
                    {
                        confirmNewPassword ? 
                        <BsFillEyeSlashFill size={18} className='text-richblack-200'></BsFillEyeSlashFill>
                        :
                        <BsFillEyeFill size={18} className='text-richblack-200'></BsFillEyeFill>
                    }
                </span>
                {
                    errors.confirmNewPassword &&
                    <p className='text-[10px] text-pink-200 pl-2'>{errors.confirmNewPassword.message} ! </p>
                }
            </div>

            <div className='flex flex-row justify-start gap-4 mt-6'>
                <button 
                    className='text-sm text-white font-bold bg-richblack-600 px-2 py-2 rounded-md'
                    onClick={()=>navigate('/dashboard/my-profile')}>
                    Cancel
                </button>
                <Iconbtn type={'submit'}>Update</Iconbtn>
            </div>
        </form>
    </div>
  )
}

export default ChangePassword