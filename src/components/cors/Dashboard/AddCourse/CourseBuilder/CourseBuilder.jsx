import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import Iconbtn from '../../../common/Iconbtn';
import { setStep,setEditCourse, setCourse } from '../../../../../slices/courseSlice';
import {toast} from 'react-hot-toast'
import { create_section, edit_section } from '../../../../../services/operations/courseDetailsApi';


const CourseBuilder = () => {
  const {register,handleSubmit,formState:{errors},setValue,getValues} = useForm();
  const [editSectionName,setEditSectionName] = useState(null);
  const {course} = useSelector((state)=>state.course)
  const [loading,setLoading] = useState(false);
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();

  function goBackHandler(){
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  }

  function goNextHandler(){
    if(course?.courseContent.length === 0){
      toast.error('Please add atleast one Section')
    }

    if(course?.courseContent?.some((section)=>section.subSection.lenght === 0)){
      toast.error('Please add atleast one lecture in each subsection')
    }

    dispatch(setStep(3));
  }

  async function submitHandler(data){
    setLoading(true);
    let result;
    if(editSectionName){
      result = await dispatch(edit_section({
        data:{
          sectionName:data.sectionName,
          sectionId:editSectionName
        },
        token
      }))
    }
    else{
      console.log("token ye raha",token)
      result = await dispatch(create_section({
        data:{
          sectionName:data.sectionName,
          courseId:course._id
        },
        token
      }))
    }

    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue('sectionName','');
    }
    setLoading(false);
  }

  function cancelEditHandler(){
    setEditSectionName(null);
    setValue('sectionName','');
  }

  function editChangeHandler(sectionName,sectionId){
    if(editSectionName === sectionId){
      cancelEditHandler();
      return;
    }
    setEditSectionName(sectionId);
    setValue('sectionName',sectionName);
  }
  return (
    <div className='bg-richblack-800 mt-10 px-4'>
        <div>
          <h2 className='text-white'>Course Builder</h2>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} >
          <div className='flex flex-col'>
            <label htmlFor='sectionName' className='text-white'>Section Name</label>
            <input
              type='text'
              name='sectionName'
              id='sectionName'
              {...register('sectionName',{required:true})}
              className='bg-richblack-700 text-white outline-none'
            ></input>
            {
              errors.sectionName &&
              <p>Section name is required</p>
            }
          </div>
            
            <Iconbtn
              text={`${editSectionName ? 'Edit Section': 'Create Section'}`}
            ></Iconbtn>
            <button
              onClick={cancelEditHandler}
              className='text-white bg-richblack-100 px-2 py-1 ml-4'
            >
              Cancel edit
            </button>
          

        </form>



        {
          course?.courseContent?.length > 0 &&
          <NestedView editChangeHandler={editChangeHandler}></NestedView>
        }

        <div className='flex flex-row gap-4 mt-10'>
          <button 
            className='text-white bg-richblack-500 px-2 py-1 '
            onClick={goBackHandler}
          >
            Back
          </button>
          <Iconbtn
            onClick={goNextHandler}
            className='bg-yellow-100'
          >
            Next
          </Iconbtn>
        </div>
    </div>
  )
}

export default CourseBuilder