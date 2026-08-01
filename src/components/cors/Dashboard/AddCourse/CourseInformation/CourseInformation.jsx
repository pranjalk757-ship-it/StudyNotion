import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { add_course_details, edit_course, get_all_categories } from '../../../../../services/operations/courseDetailsApi';
import Requirements from './Requirements';
import ChipInputs from './ChipInputs';
import ThumbnailUploader from './ThumbnailUploader';
import Iconbtn  from '../../../common/Iconbtn'
import {setStep,setCourse} from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast';
function CourseInformation() {
    const {register,setValue,getValues,formState:{errors},handleSubmit} = useForm();

    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth)
    const {course,editCourse} = useSelector((state)=>state.course)

    const getAllCategories = async()=>{
        setLoading(true);
        try{
            const response = await dispatch(get_all_categories({token}));
            console.log("yaha ",response)
            console.log("yaha ",response.length)
            if(response.length > 0){
                setCategories(response);
            }
        }
        catch(err){
            console.log('Error occurred in fetching all categories',err);
        }
        setLoading(false);
    }

    
    useEffect(()=>{
        getAllCategories();

        if(editCourse){
            console.log("course jo recieve hua",course);
            setValue('courseTitle',course?.courseName);
            setValue('courseShortDesc',course?.courseDescription);
            setValue('coursePrice',course?.price);
            setValue('courseCategories',course?.category);
            setValue('tags',course?.tag);
            setValue('courseThumbnail',course?.thumbnail);
            setValue('courseBenefits',course?.whatYouWillLearn);
            setValue('courseRequirements',course?.instructions);
        }

    },[])

    function isCourseUpdated(){
        const currentValue = getValues();

        if(currentValue.courseTitle !== course.title ||
            currentValue.courseShortDesc !== course.description ||
            currentValue.coursePrice !== course.price ||
            currentValue.courseCategories !== course.categories ||
            currentValue.tags.toString() !== course.tag.toString() ||
            currentValue.courseThumbnail !== course.thumbnail ||
            currentValue.courseBenefits !== course.whatYouWillLearn ||
            currentValue.courseRequirements.toString() !== course.instructions.toString()
        ){
            return true;
        }
        else{
            return false;
        }

    }

    async function submitHandler(data){
        console.log("token ye raha",token)
        console.log("category ye raha",data.courseCategories)
        if(editCourse){
            if(isCourseUpdated()){
                const currentValue = getValues();
                const formData = new FormData();

                formData.append('courseId',course?._id);

                if(currentValue.courseTitle !== course.title){
                    formData.append('courseName',data.courseTitle);
                }
                if(currentValue.courseShortDesc !== course.description){
                    formData.append('courseDescription',data.courseShortDesc)
                }
                if(currentValue.coursePrice !== course.price){
                    formData.append('price',data.coursePrice)
                }
                if(currentValue.courseCategories !== course.categories?._id){
                    formData.append('categoryId',data.courseCategories)
                }
                if(currentValue.tags.toString() !== course.tag.toString()){
                    formData.append('tag',JSON.stringify(data.tags))
                }
                if(currentValue.courseThumbnail !== course.thumbnail){
                    formData.append('thumbnailImage',data.courseThumbnail)
                }
                if(currentValue.courseBenefits !== course.whatYouWillLearn){
                    formData.append('whatYouWillLearn',data.courseBenefits)
                }
                if(currentValue.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append('instructions',JSON.stringify(data.courseRequirements))
                }

                setLoading(true);
                const result = await dispatch(edit_course({formData,token}))
                setLoading(false);

                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error('No changes made to course')
            }
        }
        else{
            
            const formData = new FormData();
    
            formData.append('courseName',data.courseTitle);
            formData.append('courseDescription',data.courseShortDesc)
            formData.append('price',data.coursePrice)
            formData.append('categoryId',data.courseCategories)
            formData.append('tag',JSON.stringify(data.tags))
            formData.append('thumbnailImage',data.courseThumbnail)
            formData.append('whatYouWillLearn',data.courseBenefits)
            formData.append('instructions',JSON.stringify(data.courseRequirements))
    
            setLoading(true);
            const result =  await dispatch(add_course_details({formData,token}));
            
            if(result){
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
            setLoading(false);
        }

        
    }
   return (
    <div className='mt-10'>
        <div >
            <form onSubmit={handleSubmit(submitHandler)} className='bg-richblack-800 pt-6 py-4 rounded-md space-y-6 border-2 border-richblack-600'>
                <div className='flex flex-col px-4 gap-2 '>
                    <label htmlFor='courseTitle' className='text-richblack-100 text-xs'>Course Title</label>
                    <input
                        type='text'
                        name='courseTitle'
                        id='courseTitle'
                        placeholder='Enter course Title'
                        {...register('courseTitle',{required:true})}
                        className='bg-richblack-700 rounded-md py-1 shadow-sm shadow-richblack-500 pl-2 text-md text-richblack-5 outline-none'
                    ></input>
                    {
                        errors.courseTitle &&
                        <p className='text-pink-200 text-xs'>Course Title is required</p>
                    }
                </div>
                <div className='flex flex-col px-4 gap-2'>
                    <label htmlFor='courseShortDesc' className='text-richblack-100 text-xs'  >Course Description</label>
                    <textarea
                        id='courseShortDesc'
                        name='courseShortDesc'
                        {...register('courseShortDesc',{required:true})}
                        className='bg-richblack-700 rounded-md py-1 shadow-sm shadow-richblack-500 pl-2 text-md text-richblack-5 outline-none'
                    ></textarea>
                    {
                        errors.courseShortDesc &&
                        <p className='text-pink-200 text-xs'>Course description is required</p>
                    }
                </div>
                <div className='flex flex-col px-4 gap-2'>
                    <label htmlFor='coursePrice' className='text-richblack-100 text-xs' >Price</label>
                    <input
                        type='number'
                        id='coursePrice'
                        name='coursePrice'
                        {...register('coursePrice',{required:true})}
                        className='bg-richblack-700 rounded-md py-1 shadow-sm shadow-richblack-500 pl-2 text-md text-richblack-5 outline-none'
                    ></input>
                    {
                        errors.coursePrice &&
                        <p className='text-pink-200 text-xs'>Price is required</p>
                    }
                </div>
               <div className='flex flex-col px-4 gap-2'>
                    <label htmlFor='courseCategories' className='text-richblack-100 text-xs'>Choose course category</label>
                    <select
                        id='courseCategories'
                        name='courseCategories'
                        defaultValue=''
                        {...register('courseCategories',{required:true})}
                        className='bg-richblack-700 rounded-md py-1 shadow-sm shadow-richblack-500 pl-2 text-md text-richblack-5 outline-none'
                    >
                        <option value='' disabled>Choose a Category</option>
                        {
                            !loading && 
                            categories.map((element,index)=>(
                                <option
                                    key={index}
                                    value={element?._id}
                                    className='text-white'
                                >{element.categoryName}</option>
                            ))
                            
                        }
                    </select>
                    {
                        errors.courseCategories &&
                        <p className='text-pink-200 text-xs'>Category is required</p>
                    }
                </div>
                <div>
                    <ChipInputs
                        name='tags'
                        label='Tags'
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        errors={errors}
                    ></ChipInputs>
                </div>
                <div>
                    <ThumbnailUploader
                        name='courseThumbnail'
                        label='Course Thumbnail'
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        editData={editCourse ? course?.thumbnail : null}
                    ></ThumbnailUploader>
                </div>
                <div className='flex flex-col px-4 gap-2'>
                    <label htmlFor='courseBenefits'  className='text-richblack-100 text-xs'>Course Benifits</label>
                    <textarea
                        id='courseBenefits'
                        name='courseBenefits'
                        {...register('courseBenefits',{required:true})}
                        className='bg-richblack-700 rounded-md py-1 shadow-sm shadow-richblack-500 pl-2 text-md text-richblack-5 outline-none'
                    ></textarea>
                    {
                        errors.courseBenefits && 
                        <p className='text-pink-200 text-xs'>Please enter benefits of course</p>
                    }
                </div>
                <div>
                    <Requirements
                        name='courseRequirements'
                        label='Requirements/Instructions'
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        errors={errors}
                    ></Requirements>
                </div>
                <div className='flex justify-end mt-10 mb-20' >
                    <button
                        type='submit'
                        className='bg-yellow-100 px-4 mr-2 font-bold rounded-md py-1'
                    >
                        Next
                    </button>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default CourseInformation