import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_enrolled_courses } from '../../../services/operations/ProfileApi';
import Spinner from '../common/Spinner';
import ProgressBar from '@ramonak/react-progress-bar'
import { useState } from 'react';
import { useEffect } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
function EnrolledCourses() {
    const {user} = useSelector((state)=>state.profile);
    const [enrolledCourses,setEnrolledCourses] = useState(null);
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    async function getEnrolledCourses(){
        try{
            const response = await dispatch(get_enrolled_courses({token}));
            console.log("response ",response)
            setEnrolledCourses(response);
            console.log("Enrolled course ",enrolledCourses)
        }
        catch(err){
            console.log("Unable to fetch enrolled courses",err)
        }
    }


    useEffect(()=>{
        getEnrolledCourses();
    },[])


  return (
    <div className=' mt-10'>
        <div className='px-10'>
            <p className='text-richblack-100 text-xs'> 
                Home / Dashboard /
                <span className='text-yellow-100 font-bold'> Enrolled Courses</span>
            </p>
            <h2 className='text-4xl text-white font bold mt-6'>
                Enrolled Courses
            </h2>
        </div>
        <div className=' w-[80%] mx-auto'>
            {
                !enrolledCourses ?
                <div className='grid grid-cols-1 place-items-center h-[60vh]'>
                    <Spinner></Spinner>
                </div>
                :
                <div className='bg-richblack-700 rounded-md px-[2px] pb-[2px] '>
                    {
                        !enrolledCourses.length ?
                        <div className='text-white mt-5'>
                            <p>No Courses are Enrolled </p>
                        </div>
                        :
                        <div className=' bg-richblack mt-10'>
                            <div className='text-richblack-300 grid grid-cols-4 py-4 text-md rounded-t-md'>
                                <p className='col-span-2 pl-4'>Course Name</p>
                                <p className='pl-1'>Duration</p>
                                <p className='pl-1'>Progress</p>
                            </div>
                            <div className='overflow-hidden'>
                                {
                                    enrolledCourses.map((course,index)=>(
                                        <div key={index} className='text-white grid grid-cols-4 mt-1 bg-richblack-900 py-4 px-2 items-center '
                                            onClick={()=>navigate(`/view-course/${course._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`)}
                                        >
                                            <div className='col-span-2 flex flex-row gap-2' >
                                                <img src={course.thumbnail} className='w-[50px] aspect-square rounded-md border-2 border-richblack-700'></img>
                                                <div>
                                                    <p className='text-md '>{course?.courseName} </p>
                                                    <p className='text-sm text-richblack-300'> {course?.courseDescription} </p>
                                                </div>
                                            </div>
                                            <div className='text-md text-richblack-200'>
                                                    {course?.courseDuration ? course.courseDuration : '2hr : 30 mins'}
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <div className='w-[80%]'>
                                                    <p className='text-xs text-richblack-300'>Progress: {course?.progressPercentage || 0}% </p>
                                                    <ProgressBar
                                                        completed={course?.progressPercentage || 0}
                                                        height='8px'
                                                        isLabelVisible={false}
                                                        className='w-[80%] mt-2'
                                                    ></ProgressBar>
                                                </div>
                                                <div className='pr-6 w-[20%]'>
                                                    <BsThreeDotsVertical></BsThreeDotsVertical>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            }
            
        </div>
    </div>
  )
}

export default EnrolledCourses