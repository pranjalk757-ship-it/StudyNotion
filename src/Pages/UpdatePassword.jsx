import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/operations/authApi';
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa6";

function UpdatePassword() {
    const [resetComplete,setResetComplete] = useState(false);
    
    const [formData,setFormData] = useState({password:"",confirmPassword:""})
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();

    const {password,confirmPassword} = formData;

    function submitHandler(e){
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        console.log("ye lo gi",password,confirmPassword,token);
        dispatch(resetPassword({password,confirmPassword,token,setResetComplete}))
    }
    function changeHandler(event){
        setFormData((prev)=>(
            {
                ...prev,
                [event.target.name] : event.target.value
            }
        ))
    }
    function showNewHandler(){
        setShowPassword(!showPassword);
    }
    function showConfirmHandler(){
        setShowConfirmPassword(!showConfirmPassword);
    }

    function maskEmail(email){
        const [userName,domain] = email.split('@');

        if(userName.length <= 4){
            return `${userName[0]}***@${domain}`
        }

        const firsttwo = userName.slice(0,2);
        const lasttwo = userName.slice(-2);
        const stars = '*'.repeat(userName.length - 4)

        return `${firsttwo}${stars}${lasttwo}@${domain}`;

    }
  return (
    <div className='w-full h-[90vh] flex justify-center items-center'>
        <div className='w-fit  '>
            <div className='text-white px-4 sm:px-0'>
                <div className='text-3xl'>
                    {
                        resetComplete ? 
                        <div>
                            <h2>Reset Complete!</h2>
                        </div>
                        :
                        <div>
                            <h2>Choose New Password</h2>
                        </div>
                    }
                </div>
                <div className='text-sm text-richblack-300 mt-2'>
                    {
                        resetComplete ? 
                        <div>
                            <p className='mb-2'>All done! We have sent an email to m*************@gmail.com to confirm</p>
                            {/* Home work */}
                            {/* {maskEmail(email)} */}
                        </div>
                        :
                        <div>
                            <p>Almost done. Enter your new password and youre all set.</p>
                        </div>
                    }
                </div>
                {   !resetComplete &&
                    <form onSubmit={submitHandler}>
                        <label className='relative'>
                            <p className='relative text-xs text-richblack-5 mt-5'>New Password <sup className='absolute top-0 text-sm text-pink-300'>*</sup></p>
                            <input
                                type={`${showPassword ? 'text' : 'password'}`}
                                name='password'
                                value={formData.password}
                                placeholder='Enter password'
                                onChange={changeHandler}
                                className='bg-richblack-800 mt-2 w-full rounded-md px-2 py-1 shadow-sm shadow-richblack-600 outline-none'
                            ></input>
                            {
                                !showPassword ? 
                                <div className='top-8 right-4 absolute' onClick={showNewHandler}><BsFillEyeFill></BsFillEyeFill></div>
                                : <div className='top-8 right-4 absolute' onClick={showNewHandler}><BsFillEyeSlashFill></BsFillEyeSlashFill></div>
                            }
                            
                        </label>
                        <label className='relative'>
                             <p className='relative text-xs text-richblack-5 mt-5'>Confirm new Password <sup className='absolute top-0 text-sm text-pink-300'>*</sup></p>
                            <input
                                type={`${showConfirmPassword ? 'text' : 'password'}`}
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                placeholder='Enter confirm password'
                                onChange={changeHandler}
                                className='bg-richblack-800 mt-2 w-full rounded-md px-2 py-1 shadow-sm shadow-richblack-600 outline-none'
                            ></input>
                            {
                                !showConfirmPassword ? 
                                <div className='-bottom-0 right-4 absolute' onClick={showConfirmHandler}><BsFillEyeFill></BsFillEyeFill></div>
                                : <div className='-bottom-0 right-4 absolute' onClick={showConfirmHandler}><BsFillEyeSlashFill></BsFillEyeSlashFill></div>
                            }
                        </label>
                    </form>
                }
                {
                    !resetComplete &&
                    <div className='text-xs grid grid-cols-2 mt-4'>
                        <p className='flex items-center gap-1 text-caribbeangreen-100'>
                            <FcOk></FcOk>
                            one lowercase character
                        </p>
                        <p className='flex items-center gap-1 text-caribbeangreen-100'>
                            <FcOk></FcOk>
                            one special character
                        </p>
                        <p className='flex items-center gap-1 text-caribbeangreen-100'>
                            <FcOk></FcOk>
                            one uppercase character
                        </p>
                        <p className='flex items-center gap-1 text-caribbeangreen-100'>
                            <FcOk></FcOk>
                            8 character minimum
                        </p>
                        <p className='flex items-center gap-1 text-caribbeangreen-100'>
                            <FcOk></FcOk>
                            one number
                        </p>
                    </div>
                }
                {
                    resetComplete ?
                    <button className='mt-4 w-full bg-yellow-50 text-richblack-900 text-sm rounded-md py-2'>
                        <Link to='/login'>Return to login</Link>
                    </button>
                    :
                    <button onClick={submitHandler} className='mt-4 w-full bg-yellow-50 text-richblack-900 text-sm rounded-md py-2'>
                        Reset Password
                    </button>
                }
                <div className='mt-4 text-xs  ' >
                    <Link to='/login' className='flex gap-1 items-center'>
                        <FaArrowLeft></FaArrowLeft>
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdatePassword