import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore'
import Highlighter from './Highlighter';
import ExploreCard from './ExploreCard';

function ExploreMore() {

    const [tag,setTag] = useState(HomePageExplore[0].tag);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCourse,setCurrentCourse] = useState(HomePageExplore[0].courses[0].heading);

    console.log("tag",tag);
    console.log("courses",courses);
    console.log("currentcourse",currentCourse);
    function setNewTagHandler(element){
        console.log('Element ye raha ',element)
        setTag(element.tag);
        setCourses(element.courses);
        setCurrentCourse(element.courses[0].heading);
    }
  return (
    <div>
        <div className='mt-20 mb-20 lg:text-center'>
            <h2 className='text-3xl font bold '>Unlock the <Highlighter text={"Power of Code"} color={'text-blue-100'} ></Highlighter> </h2>
            <p className='text-sm text-richblack-100 mt-5'>Learn to Build Anything You Can Imagine</p>
        </div>
        <div className='flex flex-row gap-4 justify-center items-center bg-richblack-700 px-4 py-1 rounded-full w-fit mx-auto mb-10 '>
            {
                HomePageExplore.map((element,index)=>{
                    return (
                        <div onClick={()=>setNewTagHandler(element)} key={index} 
                        className={`text-richblack-300 cursor-pointer hover:transition-all hover:duration-300 px-2 py-1 ${(element.tag === tag) ? 
                            "text-white bg-richblack-900 rounded-full  ":"text-richblack-500"}`}
                        >
                            {element.tag}
                        </div>
                    )
                })
            }
        </div>
                        <div className='h-36'></div>
        
        <div className='  text-black flex flex-row w-11/12  justify-center gap-10 mx-auto absolute z-50 -bottom-28'>
            {
                courses.map((course,index)=>{
                    return <ExploreCard courseData={course} index={index} key={index} setCurrentCourse={setCurrentCourse}
                    currentCourse={currentCourse}></ExploreCard>
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore