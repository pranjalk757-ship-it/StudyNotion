import React from 'react'
import instructorImage from '../../../assets/Images/Instructor.png'
import Highlighter from './Highlighter'
import Button from './Button'
import { FaArrowRightLong } from "react-icons/fa6";
function BecomeInstructor() {
  return (
    <div className='w-11/12 mx-auto mt-20'>
        <div className='flex flex-row text-white items-center'>
            <div className='w-[60%] flex justify-center relative'>
                <div className='absolute w-[70%] left-20 bottom-5 h-full bg-white'></div>
                <div className='relative'>
                    <img src={instructorImage}></img>
                </div>
            </div>
            <div className='w-[40%] '>
                <h2 className='text-3xl '>Become an </h2>
                <h2 className='text-3xl font-semibold'>
                    <Highlighter text={'instructor'} color={'bg-gradient-to-r  from-[#1FA2FF]  via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent'}></Highlighter>
                </h2>
                <p className='text-xs w-[60%] mt-2'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>
                <div className='mt-10'>
                    <Button 
                        text={'Start Teaching Today'}
                        linkto={'/signup'}
                        active={true}
                    >
                        <FaArrowRightLong></FaArrowRightLong>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BecomeInstructor