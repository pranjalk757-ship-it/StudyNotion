import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { resetPasswordToken } from '../services/operations/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from "react-icons/fa6";
import Spinner from '../components/cors/common/Spinner';
function ResetYourPassword() {
    const [emailSent,setEmailSent] = useState(false);
    const [emailData,setEmailData] = useState({email:""});
    const {loading} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    function changeHandler(event){
        setEmailData((prev)=>({
            ...prev,
            [event.target.name] : event.target.value
        }))
    }

    function submitHandler(event){
        if(event){
            event.preventDefault();
        }

        const response =  dispatch(resetPasswordToken({email:emailData.email,setEmailSent}));

        console.log("Response of reset password submit handler",response);
    }
  return (
    
        loading ? 
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <Spinner></Spinner> 
        </div>
        :
        <div className='  w-11/12 flex justify-center mx-auto h-[90vh] items-center '>
            <div className='w-[30%]'>
            <div className='flex flex-col gap-2 '>
                <div className='text-3xl font-semibold text-white'>
                    {
                        emailSent ? 
                            <div>
                                <h2>Check email</h2>
                            </div>
                        :
                            <div>
                                <h2>Reset your password</h2>
                            </div>
                    }
                </div>
                <div className='text-sm text-richblack-200 text-start '>
                    {
                        emailSent ? 
                            <div>
                                <p>We have sent the reset email to <br></br>
                                {`${ emailData.email}`}</p>
                            </div>
                        :
                            <div>
                                <p>Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>
                            </div>
                    }
        
                </div>
        
                <div className='mt-6'>
                    {
                        !emailSent &&
                        <form onSubmit={submitHandler} id='reset-form'>
                            <label>
                                <p className='relative w-fit text-richblack-5 text-xs'>Email Address <sup className='absolute -top-1 text-lg text-pink-400 -right-3'>*</sup> </p>
                                <input
                                    type='text'
                                    name='email'
                                    value={emailData.email}
                                    onChange={changeHandler}
                                    placeholder='Enter your email'
                                    className='bg-richblack-800 text-sm rounded-md w-full mt-2 px-2 py-2 shadow-sm shadow-richblack-500'
                                ></input>
                            </label>
                        </form>
                    }
                </div>
        
                <div>
                    {
                        emailSent ?
                        <button onClick={submitHandler} 
                        className='bg-yellow-50 text-richblack-900 text-sm w-full  py-2 rounded-md'
                        >
                            Resend Email
                        </button>
                        :
                        <button type='submit' form='reset-form' 
                        className='bg-yellow-50 text-richblack-900 text-sm w-full mt-5 py-2 rounded-md'>
                            Reset Password
                        </button>
                    }
                </div>
                <div className='text-white mt-2'>
                    <Link to='/login' className='flex gap-2 items-center text-xs'>
                        <FaArrowLeft></FaArrowLeft>
                        Back to Login
                    </Link>
                </div>
            </div>
            </div>
        </div>
    
  )
}

export default ResetYourPassword