import React from 'react'
import ContactusForm from '../components/cors/contactus/ContactusForm'
import { IoIosChatboxes } from "react-icons/io";
import { FaEarthAsia } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import ReviewSlider from '../components/cors/common/ReviewSlider';
import Footer from '../components/cors/common/Footer';
function ContactUs() {
  return (
    <div>
        <div className='flex flex-row justify-center items-start   gap-10 '>
            {/* Left Part */}
            <div className='flex flex-col bg-richblack-800 w-[20%] h-fit gap-8 pt-6 pl-8 pb-6 rounded-xl mt-20'>
                    <div className='flex flex-row gap-2'>
                        <IoIosChatboxes size={25} className='text-richblack-200'></IoIosChatboxes>
                        <div className='flex flex-col text-white'>
                            <h2 className='text-richblack-25 text-sm font-semibold'>Chat on us</h2>
                            <p className='text-xs text-richblack-300'>Our friendly team is here to help.</p>
                            <p className='text-xs text-richblack-300'>@mail address</p>
                        </div>
                    </div>

                    
                    <div className='flex flex-row gap-2'>
                        <FaEarthAsia size={20} className='text-richblack-200'></FaEarthAsia>
                        <div className='flex flex-col text-white'>
                            <h2 className='text-richblack-25 text-sm font-semibold'>Visit us</h2>
                            <p className='text-xs text-richblack-300'>Come and say hello at our office HQ.</p>
                            <p className='text-xs text-richblack-300'>Here is the location/ address</p>
                        </div>
                    </div>

                    <div className='flex flex-row gap-2'>
                        <IoCall  size={20} className='text-richblack-200'></IoCall>
                        <div className='flex flex-col text-white'>
                            <h2 className='text-richblack-25 text-sm font-semibold'>Call us</h2>
                            <p className='text-xs text-richblack-300'>Mon - Fri From 8am to 5pm</p>
                            <p className='text-xs text-richblack-300'>+123 456 7890</p>
                        </div>
                    </div>
                
                
            </div>


            {/* Right Part */}
            <div className=' w-[40%] text-white flex flex-col items-center  border-[1px] border-richblack-600 rounded-xl mt-20'>
                <div className=' w-[85%] flex flex-col items-center mt-10 pl-1'>
                    <h2 className='text-4xl w-full'>Got a Idea? We’ve got the skills. Let’s team up</h2>
                    <p className='text-sm  w-full  text-richblack-300 mt-2 '>Tall us more about yourself and what you’re got in mind.</p>
                </div>
                <div className='mt-4'>
                    <ContactusForm></ContactusForm>
                </div>

            </div>
        </div>
        <div>
            <ReviewSlider></ReviewSlider>
        </div>
        <div>
            <Footer></Footer>
        </div>
    </div>
  )
}

export default ContactUs