import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { get_category_page_details } from '../services/operations/pageAndComponentData';
import { get_all_categories } from '../services/operations/courseDetailsApi';
import CourseSlider from '../components/cors/Catalog/CourseSlider';
import CourseCard from '../components/cors/Catalog/CourseCard';

function Catalog() {
    const {categoryName} = useParams();
    const [categoryId,setCategoryId] = useState();
    const [categoryDetails,setCategoryDetails] = useState([]);
    const dispatch = useDispatch();


    async function getCategoryPageDetail(){
        const result = await dispatch(get_category_page_details({categoryId}));

        if(result){
            setCategoryDetails(result);
            console.log("category details",categoryDetails)
            console.log("result",result)
        }
    }
    useEffect(()=>{
        if(categoryId){
            getCategoryPageDetail();
        }
    },[categoryId])

    async function getCategories(){
        const result = await dispatch(get_all_categories());

        if(result){
            const category_id = result.filter((res)=>res.categoryName.replace(' ','-').toLowerCase() === categoryName)[0]?._id;
            setCategoryId(category_id);
        }
    }
    useEffect(()=>{
        getCategories();
    },[categoryName])
  return (
    <div  className='pb-20'>
       <div className='text-white py-10 px-20 bg-richblack-800 space-y-3 '>
            <div className='mt-20'>
                <div className='flex flex-row text-xs text-richblack-300 gap-2'>Home / Catalog /
                    <span className='text-yellow-100 font-bold'>
                        {categoryDetails && categoryDetails.similarCourses &&
                         <p>{categoryDetails.similarCourses.categoryName}</p>
                        }
                    </span>
                </div>
            </div>
            <div className=' text-3xl'>
                {categoryDetails && categoryDetails.similarCourses &&
                    <p>{categoryDetails.similarCourses.categoryName}</p>
                }
            </div>
            <div className='text-xs text-richblack-100'>
                {categoryDetails && categoryDetails.similarCourses &&
                    <p>{categoryDetails.similarCourses.categoryDescription}</p>
                }
            </div>
       </div>

       <div className='w-11/12 mx-auto mt-10' >
            <div>
                <p className='text-white   text-3xl'>Courses to get you started</p>
                
            </div>
            <div className='flex flex-row gap-6 text-richblack-300 mt-4'>
                <p>Most Popular</p>
                <p>New</p>
                <p>Trending</p>
            </div>
            <div className='w-full h-[1px] bg-richblack-600 mt-1 mb-6'></div>

            <div className=''>
                    <CourseSlider courses={categoryDetails?.similarCourses?.courses || []} sliderId={'similar'}></CourseSlider>
            </div>
            <div>
                    <h2 className='text-white text-3xl mb-6 mt-2'>Top Courses</h2>
                    <CourseSlider courses={categoryDetails?.differentCourses || []} sliderId={'different'}></CourseSlider>
            </div>
            <div className='mt-10'>
                    <CourseCard courses={categoryDetails?.topselling || []}></CourseCard>
            </div>
       </div>
    </div>
  )
}

export default Catalog