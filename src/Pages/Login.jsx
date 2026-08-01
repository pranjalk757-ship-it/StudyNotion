import React, { useState } from 'react'
import LoginHeading from '../components/cors/LoginPage/LoginHeading'
import LoginForm from '../components/cors/LoginPage/LoginForm';
import Button from '../components/cors/HomePage/Button';
import LoginImage from '../components/cors/LoginPage/LoginImage';
import Loginimage from '../assets/Images/login.webp'
function Login() {
    const [accountType,setAccountType] = useState('Student');
  return (
    <div className='w-full  pt-20'>
        <div className='flex flex-row w-11/12 justify-center mx-auto  gap-20'>
            <div className='w-[40%] text-white pl-20'>
                <LoginHeading
                    title={'Welcome Back'}
                    description={'Build skills for today, tomorrow, and beyond. Education to future-proof your career.'}
                    accountType={accountType}
                    setAccountType={setAccountType}
                ></LoginHeading>
                <LoginForm
                    accountType={accountType}
                    setAccountType={setAccountType}
                ></LoginForm>
                
            </div>


            <div className='pl-20'>
                <LoginImage
                image={Loginimage}
                ></LoginImage>
            </div>
        </div>
    </div>
  )
}

export default Login