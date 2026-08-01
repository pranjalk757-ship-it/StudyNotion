import React, { useState } from 'react'
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Button from '../HomePage/Button';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../../../services/operations/authApi';
import { setSignupData } from '../../../slices/authSlice';
function SignupForm({accountType,setAccountType}) {
     const [formData,setFormData] = useState({firstName:"",lastName:'', email:"",password:"",confirmPassword:''});
        const [showPassword,setShowPassword] = useState(false);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        function changeHandler(event){
            const {name,value} = event.target;
    
            setFormData((prev)=>({
                ...prev,
                [name] : value
            }))
        }
        function showPasswordHandler(){
            setShowPassword(!showPassword);
        }

        const {password,confirmPassword,email} = formData;
        function submitHandler(e){

            e.preventDefault();

            if(password !== confirmPassword){
                toast.error("Password not matching")
                return;
            }

            const signupData = {
                ...formData,
                accountType
            }

            dispatch(setSignupData(signupData));

            dispatch(sendOtp({email,navigate}));

            setFormData({
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                confirmPassword:'',
            })

            setAccountType("Student");
        }

  return (
    <div>
        <form onSubmit={submitHandler}>
                <div className='mt-10'>
                    <div className='mb-4'>
                        <label htmlFor='firstName' className='text-xs relative'>First Name
                            <sup className='absolute -right-3 text-pink-400 text-lg  '>*</sup> </label>
                        <br></br>
                        <input
                        type="text"
                        className=' rounded-md py-2 bg-richblack-800 w-[80%] text-xs pl-4  shadow-sm shadow-richblack-300 outline-none'
                        placeholder='Enter first name'
                        onChange={changeHandler}
                        name='firstName'
                        value={formData.firstName}
                        id='firstName'
                        ></input>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='lastName' className='text-xs relative'>Last Name
                            <sup className='absolute -right-3 text-pink-400 text-lg  '>*</sup> </label>
                        <br></br>
                        <input
                        type="text"
                        className=' rounded-md py-2 bg-richblack-800 w-[80%] text-xs pl-4  shadow-sm shadow-richblack-300 outline-none'
                        placeholder='Enter last name'
                        onChange={changeHandler}
                        name='lastName'
                        value={formData.lastName}
                        id='lastName'
                        ></input>
                    </div>
            </div>
            
            {/* email */}
            <div className='mb-4'>
                <label htmlFor='email' className='text-xs relative'>Email Address 
                    <sup className='absolute -right-3 text-pink-400 text-lg  '>*</sup> </label>
                <br></br>
                <input
                type="text"
                className=' rounded-md py-2 bg-richblack-800 w-[80%] text-xs pl-4  shadow-sm shadow-richblack-300 outline-none'
                placeholder='Enter email address'
                onChange={changeHandler}
                name='email'
                value={formData.email}
                id='email'
                ></input>
            </div>

            <div className='relative w-[80%]'>
                <label htmlFor='email' className='text-xs relative'>Password
                <sup className='absolute -right-3 text-pink-400 text-lg  '>*</sup> 
                </label>
                <br></br>
                <input
                type={`${showPassword ? "text":"password"}`}
                className=' rounded-md py-2 pl-4 bg-richblack-800 w-[100%] text-xs shadow-sm shadow-richblack-300 outline-none '
                placeholder='Enter Password'
                onChange={changeHandler}
                name='password'
                value={formData.password}
                id='password'
                ></input>
                {
                    showPassword ? 
                    <div className='absolute right-5 top-8 text-richblack-300' onClick={showPasswordHandler}>
                        <BsFillEyeSlashFill></BsFillEyeSlashFill>
                    </div>
                    :
                    <div className='absolute right-5 top-8 text-richblack-300 ' onClick={showPasswordHandler}>
                        <BsFillEyeFill></BsFillEyeFill>
                    </div>
                }
            </div>


            <div className='relative w-[80%]'>
                <label htmlFor='confirmPassword' className='text-xs relative'>Confirm Password
                <sup className='absolute -right-3 text-pink-400 text-lg  '>*</sup> 
                </label>
                <br></br>
                <input
                type={`${showPassword ? "text":"password"}`}
                className=' rounded-md py-2 pl-4 bg-richblack-800 w-[100%] text-xs shadow-sm shadow-richblack-300 outline-none '
                placeholder='Enter Confirm Password'
                onChange={changeHandler}
                name='confirmPassword'
                value={formData.confirmPassword}
                id='confirmPassword'
                ></input>
                {
                    showPassword ? 
                    <div className='absolute right-5 top-8 text-richblack-300' onClick={showPasswordHandler}>
                        <BsFillEyeSlashFill></BsFillEyeSlashFill>
                    </div>
                    :
                    <div className='absolute right-5 top-8 text-richblack-300 ' onClick={showPasswordHandler}>
                        <BsFillEyeFill></BsFillEyeFill>
                    </div>
                }
            </div>


            
                <button type='submit' className='w-[80%] rounded-md py-1 text-richblack-900 mt-4 bg-yellow-100 '>Sign up</button>
            

        </form>
    </div>
  )
}

export default SignupForm