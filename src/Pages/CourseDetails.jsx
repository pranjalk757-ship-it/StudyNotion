import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buy_course } from '../services/operations/paymentApi';
import { get_course_detail } from '../services/operations/courseDetailsApi';
import CourseDetailsCard from '../components/cors/CourseDetail/CourseDetailsCard';
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaLanguage } from "react-icons/fa6";
import { ACCOUNT_TYPE } from '../utils/constants';
import toast from 'react-hot-toast';
import ReviewSlider from '../components/cors/common/ReviewSlider';
function CourseDetails() {
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {courseId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [courseData,setCourseData] = useState(null);


    async function fetchCourseDetail(){
        const result = await dispatch(get_course_detail({courseId}));
        console.log("result",result);
        if(result){
            setCourseData(result);
        }
    }
    useEffect(()=>{
        fetchCourseDetail();
    },[])

    async function buyHandler(){
        setLoading(true);
        try{
            if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
                toast.error("You are instructor, you can't buy course")
            }
            if(token){
                await buy_course(token,[courseId],user,navigate,dispatch);
                return;
            }
            else{
                navigate('/login');
                toast.success("Login First,to Buy course")
            }
        }
        catch(err){
            console.log("Error occurred in buy Course Handler")
        }
        setLoading(true);
    }

 
  return (
    <div>
        <div className='text-white '>
            <div className='bg-richblack-800 pt-[3rem] flex flex-row items-center justify-start pl-[5%] min-h-[20rem] '>
                <div className='w-[65%] space-y-4 '>

                    <div className='text-sm text-richblack-300'>
                        <p>Home / Learning / <span className='text-yellow-100 font-semibold'>{courseData?.category?.[0]?.categoryName}</span></p>
                    </div>
                    <div className='text-3xl'>
                        {courseData?.courseName}
                    </div>
                    <div className='text-sm text-richblack-200'>
                        {courseData?.courseDescription}
                    </div>
                    <div className='teext-md'>
                        created by {courseData?.instructor?.firstName} {courseData?.instructor?.lastName}
                    </div>
                    <div className='flex flex-row gap-10 text-richblack-25'>
                        <div className='flex flex-row gap-2 items-center'>
                            <FaRegCalendarCheck></FaRegCalendarCheck>
                            Created at {courseData?.createdAt.split('T')?.[0]}
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <FaLanguage></FaLanguage>
                            <p>English</p>
                        </div>
                    </div>
                </div>
                <div className='w-[1px] bg-richblack-600 h-[12rem] '></div>
            </div>
            <div className='relative'>
            <CourseDetailsCard courseData={courseData} buyHandler={buyHandler}></CourseDetailsCard>
            </div>

        </div>
        <div className='mt-40'>
            <ReviewSlider></ReviewSlider>
        </div>

    </div>
  )
}

export default CourseDetails