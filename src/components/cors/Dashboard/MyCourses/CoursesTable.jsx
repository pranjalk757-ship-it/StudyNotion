import React from 'react'
import { COURSE_STATUS } from '../../../../utils/constants'
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { delete_course, fetch_instructor_courses } from '../../../../services/operations/courseDetailsApi';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../../common/ConfirmationModal'
import { useState } from 'react';
import { setEditCourse,setCourse } from '../../../../slices/courseSlice';

function CoursesTable({courses,setCourses}) {
    const navigate = useNavigate();
    const [confirmationModal,setConfirmationModal] = useState(null);
    const {token} = useSelector((state)=>state.auth)
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    async function deleteCourse(courseId){
        await dispatch(delete_course({courseId,token}));

        setLoading(true);
        const result = await dispatch(fetch_instructor_courses({token}));

        if(result){
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }
    function deleteHandler(courseId){
        setConfirmationModal({
            text1:'Do you want to delete this course?',
            text2:'All the data related to this course will be deleted',
            btn1Text:'Delete',
            btn2Text:'Cancel',
            btn1Handler:()=>deleteCourse(courseId),
            btn2Handler:()=>setConfirmationModal(null)
        })
    }
    function editHandler(course){
        console.log("course jo set kiya",course);
        dispatch(setCourse(course));
        dispatch(setEditCourse(true));
        navigate('/dashboard/add-course');
    }
  return (
    <div>
        <div className=''>
            <div className=''>
                <div className='text-white text-start font-extrabold grid grid-cols-5 px-2 rounded-md'>
                    <div className='col-span-2'>Courses</div>
                    <div>Duration</div>
                    <div>Prices</div>
                    <div>Actions</div>
                </div>
            </div>
            <div className=''>
                {
                    courses.length === 0 ?
                    <div>
                        <p>No Course is present</p>
                    </div>
                    :
                    courses.map((course)=>(
                        <div className='text-white text-sm  font-bold mt-5 bg-richblack-800 grid grid-cols-5 items-center p-2' >
                            <div className='flex flex-row col-span-2 space-x-4'>
                                <div className='border-2 rounded-md overflow-hidden'>
                                    <img src={course.thumbnail} className='w-[80px] h-[80px]' alt="" />
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <p>{course.couseName}</p>
                                    <p>{course.courseDescription}</p>
                                    <p>Created : </p>
                                    <div>
                                        {
                                            course.status === COURSE_STATUS.PUBLISHED ?
                                            <div>
                                                <p>Published</p>
                                            </div>
                                            :
                                            <div>
                                                <p>Drafted</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>20h 10m</p>
                            </div>
                            <div>
                                {course.price}
                            </div>
                            <div>
                                <>
                                   <button
                                    onClick={()=>editHandler(course)}
                                   >
                                        <MdOutlineModeEditOutline></MdOutlineModeEditOutline>
                                   </button>
                                    <button
                                        disabled={loading}
                                        onClick={()=>deleteHandler(course._id)}
                                    >
                                        <MdDeleteOutline></MdDeleteOutline>
                                    </button>
                                </>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        {
            confirmationModal &&
            <ConfirmationModal confirmationModal={confirmationModal}></ConfirmationModal>
        }
    </div>
  )
}

export default CoursesTable