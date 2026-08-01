import React from 'react'
import { useForm } from 'react-hook-form'
import countryCode from '../../../data/countrycode.json'
function ContactusForm() {
    const {register,handleSubmit,reset,formState:{errors}} = useForm();

    function submitHandler(data){
        console.log(data);
        reset();
    }
  return (
    <div className=' flex  w-full justify-center mt-[5%]'>
        <form onSubmit={handleSubmit(submitHandler)}  className=' '>
            <div className='flex flex-row text-white gap-4 '>
                <div className='flex flex-col w-full'>
                    <label htmlFor="firstName" className='text-xs'>First Name</label>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Enter First Name'
                        {...register('firstName',{required:"First Name is mandatory"})}
                        className='bg-richblack-800 rounded-md pl-2 py-1 text-sm shadow-md shadow-richblack-600 outline-none mt-2 '
                    >
                    </input>
                    { errors.firstName &&
                        <p className='text-[10px] mt-2 text-pink-200'>{errors.firstName.message}</p>
                    }
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="lastName" className='text-xs'>Last Name</label>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter Last Name'
                        {...register('lastName')}
                        className='bg-richblack-800 rounded-md pl-2 py-1 text-sm shadow-md shadow-richblack-600 outline-none mt-2 '
                    >
                    </input>
                </div>
            </div>
            <div className='text-white mt-6 flex flex-col'>
                <label htmlFor="email" className='text-xs'>Email Address</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter your email'
                    {...register('email',{required:"Email is mandatory"})}
                    className='bg-richblack-800 rounded-md pl-2 py-1 text-sm shadow-md shadow-richblack-600 outline-none mt-2 '
                ></input>
                {
                    errors.email &&
                    <p className='text-[10px] mt-2 text-pink-200'>{errors.email.message} </p>
                }
            </div>

            <p className='text-white text-xs mt-6'>Phone Number</p>
            <div className='w-full flex justify-between'>
                <select className=' overflow-y-auto bg-richblack-800 rounded-md pl-2 py-1 text-sm shadow-md shadow-richblack-600 outline-none mt-2 text-richblack-400 w-[18%]  '
                    {...register('countryCode',{required:true})}
                >
                    {
                        countryCode.map((code,index)=>(
                            <option key={index} className='text-white' >
                                {code.code} -{code.country}
                            </option>
                        ))
                    }
                </select>
                <input
                    type='tel'
                    placeholder='1234-567-890'
                    className='w-[80%] bg-richblack-800 text-white rounded-md pl-2 py-1 text-sm shadow-md shadow-richblack-600 outline-none mt-2'
                    {...register('phoneNumber',{required:"Phone number is mandatory",
                        minLength:{
                            value:10,
                            message:"Invalid phone number"
                        },
                        maxLength:{
                            value:10,
                            message:"Invalid phone number"
                        }
                    })}
                >
                </input>
            </div>
                {
                    errors.phoneNumber &&
                    <p className='text-[10px] mt-2 text-pink-200'>{errors.phoneNumber.message}</p>
                }
                

            <div className='text-white mt-6 flex flex-col'>
                <label htmlFor='message' className='text-xs'>Message</label>
                <textarea
                    rows={5}
                    name='message'
                    id='message'
                    placeholder='Enter message'
                    {...register('message',{required:"Enter your message"})}
                    className='bg-richblack-800 rounded-md pl-2 py-1 text-sm shadow-md shadow-richblack-600 outline-none mt-2 '
                ></textarea>
                {
                    errors.message &&
                    <p className='text-[10px] mt-2 text-pink-200'>
                        {errors.message.message}
                    </p>
                }
            </div>
            <div>
                <button type='submit' className='bg-yellow-100 text-richblack-900 font-semibold mb-10 mt-10 w-full py-2 rounded-md font-bold'>Send Message</button>
            </div>
        </form>
    </div>
  )
}

export default ContactusForm