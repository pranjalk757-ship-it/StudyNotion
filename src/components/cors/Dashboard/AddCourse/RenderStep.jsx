import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheckCircle } from "react-icons/fa";
import CourseInformation from './CourseInformation/CourseInformation';
import CourseBuilder from './CourseBuilder/CourseBuilder';
import PublishCourse from './PublicCourse/PublishCourse';
function RenderStep() {
    const {step} = useSelector((state)=>state.course);

    const steps = [
        {
            id: 1,
            title: 'Course Information'
        },
        {
            id: 2,
            title: 'Course Builder'
        },
        {
            id: 3,
            title: 'Publish'
        },
    ]
  return (
    <div className=''>
        <div className='flex flex-row justify-between'>
            {
                steps.map((element)=>(
                    <div  key={element.id}  className='flex flex-row items-center '>
                        <div className='flex flex-col '>
                            <div className=' flex flex-row items-center  '>
                                <div
                                    className={` w-8 h-8 rounded-full flex flex-row justify-center items-center
                                    ${element.id <= step ? 'text-yellow-100 border-2 border-yellow-100 bg-yellow-900':
                                        'bg-richblack-700 text-richblack-300 border-2 border-richblack-300'}    
                                    `}
                                >
                                    {
                                        element.id < step  ? 
                                        <FaCheckCircle className='text-yellow-100 '></FaCheckCircle>
                                        :
                                        <div>{element.id} </div>
                                    }
                                </div>
                                    {
                                        element.id < 3 &&
                                        <div className='h-1 w-[15rem] ml-4 mt-3 border-t-2 border-dashed border-richblack-500 mb-4'></div>

                                    }
                            </div>
                            <div
                                className={`${element.id > step ? "text-richblack-300":"text-white" }
                                    ${element.id < step ? "font-bold" : ""}
                                    text-xs pr-10 mt-2
                                    `}
                            >
                                {element.title}
                            </div>
                        </div>
                        
                            
                    </div>
                        
                ))
            }
        </div>
        {
            step === 1 && <CourseInformation></CourseInformation>
        }
        {
            step === 2 && <CourseBuilder></CourseBuilder>
        }
        {
            step === 3 && <PublishCourse></PublishCourse>
        }
    </div>
  )
}

export default RenderStep