import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Iconbtn from '../../../common/Iconbtn';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { edit_course } from '../../../../../services/operations/courseDetailsApi';

function PublishCourse() {

  const {register,handleSubmit,setValue,getValues,formState:{errors}} = useForm();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth)
  function goBackHandler(){
    dispatch(setStep(2));
  }

  function gotoCourses(){

  }

  async function submitHandler(data){
    if(course?.status === COURSE_STATUS.PUBLISHED && data.public === true ||
      course?.status === COURSE_STATUS.DRAFT && data.public === false
    ){
      gotoCourses();
      return;
    }
    else{
      const formData = new FormData();

      formData.append('courseId',course._id);
      const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
      formData.append('status',courseStatus)

      setLoading(true);
      console.log('formData inside',formData);
      const result = await dispatch(edit_course({data:formData,token}))
      if(result){
        gotoCourses();
      }
      setLoading(false);
    }
  }
  return (
    <div className='mt-10 bg-richblack-700 rounded-md'>
      <div>
        <h2 className='text-white '>Publish Course</h2>
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <input
            type='checkbox'
            name='public'
            id='public'
            {...register('public',{required:true})}
          ></input>
          <label htmlFor='public' className='text-white'>Make this Course Public</label>
        </div>
        <div className='flex flex-row justify-between '>
          <button
            onClick={goBackHandler}
          >
            Back
          </button>
          <div>
            <button
              type='submit'
            >
              Save as a Draft
            </button>
            <Iconbtn
              text={'Save and Publish'}
              type={'submit'}
            ></Iconbtn>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse