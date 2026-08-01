import React from 'react'
import { IoIosContacts } from "react-icons/io";
import { PiTreeStructureDuotone } from "react-icons/pi";

function ExploreCard({courseData,index,setCurrentCourse,currentCourse}) {
    function setnewCourseHandler(element){
        setCurrentCourse(element);
        console.log("ye lo bhai",currentCourse)
    }
  return (
    <div className='w-[25%] relative lg:h-[15rem]' 
    onClick={()=>setnewCourseHandler(courseData.heading)}>

        {
            currentCourse === courseData.heading &&
            <div className='w-full bg-yellow-50 h-full absolute left-3 top-3 hover:transition-all hover:duration-200'></div>
        }
        <div className={`relative  h-full flex flex-col justify-around 
            ${currentCourse === courseData.heading ? "bg-white hover:transition-all hover:duration-100":
                "bg-richblack-800 hover:transition-all hover:duration-100"}
        `}>

            <div className='px-5 mb-10'>
                <h2 className={`text-md mt-5
                 ${currentCourse === courseData.heading ? "text-richblack-900":"text-white"}
                `}>{courseData.heading} </h2>
                <p className='text-xs text-richblack-400 mt-5'>{courseData.description} </p>
            </div>
            <div className='flex flex-col mt-5'>
                <div className=' h-[1px]  border-t-2 border-dashed border-richblack-500'></div>
                <div className={`flex flex-row text-sm text-richblue-500 justify-between px-5 my-3
                    ${currentCourse === courseData.heading ? "text-blue-300 font-semibold" : "text-richblack-200 font-semibold "}
                `}>
                    <div className='flex flex-row gap-1 items-center'>
                        <IoIosContacts size={25}></IoIosContacts>
                        {courseData.level}
                    </div>
                    <div className='flex flex-row gap-1 items-center'>
                        <PiTreeStructureDuotone className='rotate-90' size={20}></PiTreeStructureDuotone>
                        {courseData.lessionNumber} Lessons
                    </div>
                </div>
            </div>
        </div>



    </div>
  )
}

export default ExploreCard