import React, { useEffect, useState } from 'react'
import StudentViewSidebar from '../components/cors/StudentView/StudentViewSidebar'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { get_full_course_details } from '../services/operations/viewCourseDetails';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import StudentReviewModal from '../components/cors/StudentView/StudentReviewModal';
import { useSelector } from 'react-redux';
function StudentView() {
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth)
    const [reviewModal,setReviewModal] = useState(false);
    const dispatch = useDispatch();

    const fecthFullCourseDetail = async()=>{
        const result = await dispatch(get_full_course_details({courseId,token}))
        console.log("result",result)
        if(result){
            dispatch(setEntireCourseData(result));
            dispatch(setCourseSectionData(result?.courseContent));
            dispatch(setCompletedLectures(result?.courseProgressCount))
            let totalLectures = 0;
            result?.data?.courseContent?.forEach((section)=>{
                totalLectures += section.subSection.length
            })
            console.log("entire data",result);
            dispatch(setTotalNoOfLectures(totalLectures));
        }
    }

    useEffect(()=>{
        fecthFullCourseDetail();
    },[])
  return (
    <div className=''>
        <div className='flex flex-row'>
            <div className='bg-richblack-800 h-[100vh] w-[15%] pt-8 '>
                <StudentViewSidebar reviewModal={reviewModal} setReviewModal={setReviewModal}></StudentViewSidebar>
            </div>
            <div className='w-[85%]'>
                <Outlet></Outlet>
            </div>
        </div>
        {
            reviewModal &&
            <StudentReviewModal  setReviewModal={setReviewModal}></StudentReviewModal>
        }
    </div>
  )
}

export default StudentView