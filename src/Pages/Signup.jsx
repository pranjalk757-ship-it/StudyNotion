import React, { useState } from 'react'
import LoginHeading from '../components/cors/LoginPage/LoginHeading'
import SignupForm from '../components/cors/Signup/SignupForm'
import Signupimage from '../assets/Images/signup.webp'
import LoginImage from '../components/cors/LoginPage/LoginImage'
import Button from '../components/cors/HomePage/Button'
function Signup() {
    const [accountType,setAccountType] = useState('Student');
  return (
    <div className='flex flex-row w-11/12 justify-center mx-auto  gap-20 pt-20'>
        <div className='w-[40%] text-white pl-20'>
            <LoginHeading
                title={'Join the millions learning to code with StudyNotion for free'}
                description={'Build skills for today, tomorrow, and beyond. Education to future-proof your career.'}
                accountType={accountType}
                setAccountType={setAccountType}
            ></LoginHeading>

            <SignupForm
                accountType={accountType}
                setAccountType={setAccountType}
            ></SignupForm>
            
        </div>


        <div className='pl-20'>
            <LoginImage
             image={Signupimage}
            ></LoginImage>
        </div>
    </div>
  )
}

export default Signup