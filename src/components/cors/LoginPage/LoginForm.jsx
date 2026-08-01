import React, { useState } from 'react'
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Button from '../HomePage/Button';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authApi';
import toast from 'react-hot-toast';
function LoginForm() {
    const [formData,setFormData] = useState({email:"",password:""});
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

    function submitHandler(e){
        e.preventDefault();
        const {email,password} =  formData;
        dispatch(login({email,password,navigate}));
    }

  return (
    <div className='flex flex-col mt-10'>
        <form onSubmit={submitHandler}>
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
                <div className='text-[10px] absolute right-2 pt-1 text-blue-100'><Link to='/reset-password'>Forget Password</Link></div>
            </div>

            <div className='mt-16 w-full '>
                    <button onClick={submitHandler} className='bg-yellow-100 font-semibold w-[80%] rounded-md py-2 text-richblack-800'>Sign in</button>
            </div>
            
        </form>
    </div>
  )
}

export default LoginForm