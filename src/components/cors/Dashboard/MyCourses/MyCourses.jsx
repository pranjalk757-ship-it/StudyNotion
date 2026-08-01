import React, { useEffect, useState } from 'react'
import Iconbtn from '../../common/Iconbtn'
import { useNavigate } from 'react-router-dom'
import CoursesTable from './CoursesTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_instructor_courses } from '../../../../services/operations/courseDetailsApi';

function MyCourses() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [courses,setCourses] = useState([]);
    const {token} = useSelector((state)=>state.auth)
    async function fetchMyCourses(){
        const result = await dispatch(fetch_instructor_courses({token}));

        if(result){
            setCourses(result);
        }
    }

    useEffect(()=>{
        fetchMyCourses();
    },[])
  return (
    <div>
        <div className='flex flex-row justify-between'>
            <h2 className='text-white text-2xl'>My Courses</h2>

            <Iconbtn
                text={'Add Courses'}
                onClick={()=>navigate('/dashboard/add-course')}
            ></Iconbtn>
        </div>
        <div className='mx-auto w-[90%] mt-[5%]'>

         <CoursesTable courses={courses} setCourses={setCourses}></CoursesTable>
        </div>
    </div>
  )
}

export default MyCourses