import React, { useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../services/operations/authApi';
import { useNavigate } from 'react-router-dom';
import Button from '../components/cors/HomePage/Button';
function OtpVerify() {
    const [otp,setOtp] = useState('');
    const {signupData} = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function verifyAndsignup(e){
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType
        } = signupData;

        dispatch(signup({firstName,lastName,email,password,confirmPassword,accountType,otp,navigate}));
    }
  return (
    <div className='text-white'>
        <h2>Verify Email</h2>
        <p>
            A verification code has been sent to you. Enter the code below
        </p>
        <form onSubmit={verifyAndsignup}>
            <OTPInput
                name='otp'
                value={otp}
                onChange={setOtp}
                numInputs={6}
                className='w-96'
                renderInput={(props)=> <input
                    
                    {...props}
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                    className='text-richblack-5 text-xl  bg-richblack-800 w-[48px] h-10 mx-2 text-center'
                
                ></input>}
            ></OTPInput>
        </form>
        <button className='bg-yellow-100 text-richblue-800 font-semibold mt-4' onClick={verifyAndsignup}>Verify Email</button>

    </div>
  )
}

export default OtpVerify