import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_instructor_stats } from '../../../../services/operations/ProfileApi';
import { fetch_instructor_courses } from '../../../../services/operations/courseDetailsApi';
import { useNavigate } from 'react-router-dom';
import InstructorChart from './InstructorChart';

function InstructorDashboard() {
    const [instructorStats,setInstructorStats] = useState([]);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const [courses,setCourses] = useState([]);
    async function fetchInstructorStats(){
        setLoading(true);
        try{
            const result = await dispatch(get_instructor_stats({token}))
            const instructorCourses = await dispatch(fetch_instructor_courses({token}));
            if(result){
                setInstructorStats(result);
            }
            if(instructorCourses){
                setCourses(instructorCourses);
            }
        }
        catch(err){
            console.log("Error occurred in fetching instructor stats",err)
        }
        setLoading(false);
    }

    const totalAmountEarned = instructorStats?.reduce((acc,curr)=>acc+curr?.totalAmountGenerated,0)
    const totalStudentEnrolled = instructorStats?.reduce((acc,curr)=>acc+curr?.totalStudentEnrolled,0)
    useEffect(()=>{
        fetchInstructorStats();
        console.log("totalAmount",totalAmountEarned);
        console.log("totalAmount",totalStudentEnrolled);
    },[],[instructorStats,totalAmountEarned,totalStudentEnrolled])
  return (
    <div className='text-white w-11/12 mx-auto mt-10'>
       <div>
        <h2 className='font-bold text-lg'>Hi {user?.firstName}</h2>
        <p className='text-sm text-richblack-100 mt-2'>Let's start something new</p>
       </div>
       {/* pie chart and stats */}
       <div className='mt-4 flex flex-row gap-4'>
        {/* left box */}
        <div className='bg-richblack-800 w-[80%]'>
            <InstructorChart courses={instructorStats}></InstructorChart>
        </div>
        {/* right box */}
        <div className='bg-richblack-800 w-[20%] py-4 pl-4 rounded-md space-y-4'>
            <p className='text-sm font-bold'>Statistics</p>
            <div>
                <p className='text-sm text-richblack-300'>Total Courses</p>
                <p className='font-bold text-md'>{user?.courses?.length}</p>
            </div>
            <div>
                <p className='text-sm text-richblack-300'>Total Students</p>
                <p className='font-bold text-md'>{totalStudentEnrolled}</p>
            </div>
            <div>
                <p className='text-sm text-richblack-300'>Total Income</p>
                <p className='font-bold text-md'>Rs. {totalAmountEarned}</p>
            </div>
        </div>
       </div>

       {/* View courses */}
       <div className='bg-richblack-800 mt-10 p-4 rounded-md'>
            <div className='flex flex-row justify-between'>
                <p className='text-md font-bold'>Your Courses</p>
                <button
                    onClick={()=>navigate('/dashboard/my-courses')}
                    className='text-md font-semibold text-yellow-50'
                >
                    View All
                </button>
            </div>
            <div className='grid grid-cols-3 gap-4 mt-6'>
                {
                    courses?.slice(0,3).map((course)=>(
                        <div key={course?._id} className=''>
                            <div>
                                <img src={course?.thumbnail} alt="thumbnail" className='w-full rounded-md'/>
                            </div>
                            <div className='flex flex-col mt-2'>
                                <p className='text-sm font-bol'>{course?.courseName}</p>
                                <div className='flex flex-row gap-2'>
                                    <p className='text-xs text-richblack-100'>{totalStudentEnrolled} Students</p>
                                    <p className='text-xs text-richblack-100'> |</p>
                                    <p className='text-richblack-50 text-xs'>Rs. {course?.price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
       </div>
    </div>
  )
}

export default InstructorDashboard