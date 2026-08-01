import React, { useState } from 'react'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'
import { addToCart } from '../../../slices/cartSlice'
import { useDispatch } from 'react-redux'
import { CiTimer } from "react-icons/ci";
import { FaLocationArrow } from "react-icons/fa6";
import { TbAccessPoint } from "react-icons/tb";
import { PiCertificateDuotone } from "react-icons/pi";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
function CourseDetailsCard({courseData,buyHandler}) {
  const dispatch = useDispatch();
  function shareHandler(){
    const text = copy(window.location.href)
    toast.success("Link copied")
  }

  const [openSections,setOpenSections] = useState([]);
  const [openLecture,setOpenLecture] = useState([]);
  function toggleLectureHandler(id){
    setOpenLecture((prev)=>
      prev.includes(id) ? prev.filter((prevId)=>prevId !== id) : [...prev,id]
    )
  }
  function toggleHandler(id){
    setOpenSections((prev)=>
      prev.includes(id) ? prev.filter((prevId)=> prevId !== id) : [...prev,id]
    );
    setOpenLecture([]);
  }

  function collapseHandler(){
    setOpenLecture([]);
    setOpenSections([]);
  }

  function addToCartHandler(courseData){
    dispatch(addToCart(courseData))
  }

  const totalLectures = courseData?.courseContent?.reduce((acc,section)=> acc + section.subSection.length , 0);
  const totalDuration = courseData?.courseContent?.reduce((acc,section)=> 
                                                        acc + section?.subSection?.reduce((subAcc,lectures)=> subAcc + Number(lectures?.timeDuration),0)                                                      
                                                      ,0);

  console.log("Total lectures",totalLectures)
  console.log("Total duration",totalDuration)
  return (
    <div className=''>
        <div className='text-white w-[20rem] border-2 border-richblack-600 bg-richblack-800 rounded-md overflow-hidden absolute 
        right-[10%] 
        -top-[17rem]'> 
          <div>
            <img src={courseData?.thumbnail}></img>
          </div>
          <div className='text-3xl pl-[5%] py-2'>
            <p>Rs. {courseData?.price}</p>
          </div>
          <div className='flex flex-col w-[90%] mx-auto space-y-4'>
            <button
              className='bg-yellow-100 py-2 rounded-md text-richblack-900  font-bold text-sm'
              onClick={()=>addToCartHandler(courseData)}
            >
              Add to Cart
            </button>

            <button
              className='bg-richblack-900 text-white py-2 rounded-md shadow-sm shadow-richblack-500 font-bold text-sm'
              onClick={buyHandler}
            >
              Buy Now
            </button>
          </div>
          <div className='text-sm text-richblack-50 text-center mt-4'>
            <p>30-Day Money-Back Gurantee</p>
          </div>
          <div className='mt-6 space-y-2 pl-[5%]'>
            <p className='text-md'>This course includes:</p>
            <div className='space-y-2'> 
                <div className='text-sm text-caribbeangreen-50 flex flex-row items-center gap-2'>
                  <CiTimer></CiTimer>
                  <p>8 hours on-demand video</p>
                </div>
                <div className='text-sm text-caribbeangreen-50 flex flex-row items-center gap-2'>
                  <FaLocationArrow></FaLocationArrow>
                  <p>Full Lifetime access</p>
                </div>
                <div className='text-sm text-caribbeangreen-50 flex flex-row items-center gap-2'>
                  <TbAccessPoint></TbAccessPoint>
                  <p>Access on Mobile and TV</p>
                </div>
                <div className='text-sm text-caribbeangreen-50 flex flex-row items-center gap-2'>
                  <PiCertificateDuotone></PiCertificateDuotone>
                  <p>Certificate of completion</p>
                </div>
            </div>
          </div>
          <div className='flex flex-row justify-center pt-6 pb-4'>
            <button
              className='text-yellow-100'
              onClick={shareHandler}
            >
              Share
            </button>
          </div>
        </div>

        <div className='bg-richblack-900 w-[60%] ml-10 mt-10 border border-richblack-500 pl-4 py-6'>
          <div>
            <p className='text-3xl'>What you'll learn</p>
            <div className='text-xs mt-2 text-richblack-200'>
              {
                courseData?.whatYouWillLearn
              }
            </div>
          </div>
        </div>
        
        <div className='w-[60%] ml-10 mt-10'>
          <div className='text-2xl'>Course Content</div>
          <div className='flex flex-row justify-between mt-4'>
            <div className='flex flex-row text-sm text-richblack-300 gap-2 '>
              <p>{courseData?.courseContent?.length} section</p>
              <p>|</p>
              <p>{totalLectures} Lecture</p>
              <p>|</p>
              <p>{Math.floor(totalDuration)} Duration</p>
            </div>
            <div>
              <button
                onClick={collapseHandler}
                className='text-sm text-yellow-50 font-bold'
              >
                Collapse all Sections
              </button>
            </div>
          </div>

          <div className='text-white mt-4'>
              {
                courseData?.courseContent?.length === 0 ?
                <p>No section present</p>
                :
                courseData?.courseContent?.map((section)=>{
                  const isOpen = openSections.includes(section?._id);
                  const totalSectionDuration = section?.subSection?.reduce((acc,lecture)=> acc + Number(lecture?.timeDuration),0)
                  return (
                    <div key={section._id}>
                      <div
                        onClick={()=>toggleHandler(section?._id)}
                        className='flex justify-between bg-richblack-800 px-10 py-2 border border-richblack-400

                        '
                      >
                          <div className='flex flex-row items-center gap-2'>
                            {
                              isOpen  ? <MdKeyboardArrowUp></MdKeyboardArrowUp> : <MdKeyboardArrowDown></MdKeyboardArrowDown>
                            }
                            <p>{section?.sectionName}</p>
                          </div>
                          <div className='flex flex-row gap-4 items-center'>
                            <div>
                              <p className='text-yellow-50 text-sm'>{section?.subSection?.length} Lectures</p>
                            </div>
                            <div>
                              <p className='text-sm'>{Math.floor(totalSectionDuration)} duration</p>
                            </div>
                          </div>
                      </div>
                      <div>
                        <div
                          className={`flex flex-col bg-richblack-900 border border-richblack-500  px-10 justify-between overflow-hidden
                                      ${isOpen ? 'max-h-96': " max-h-0"}
                                      `}
                                      
                        >
                          {
                            section?.subSection?.map((lecture)=>{
                              const isLectureOpen = openLecture.includes(lecture?._id);
                              return(
                                  <div
                                    key={lecture._id}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        toggleLectureHandler(lecture?._id)}
                                      }
                                  >
                                    <div className={`flex flex-row justify-between pt-4
                                      
                                      `}>
                                      <div className='text-[16px] flex flex-row gap-2 items-center'>
                                        <HiMiniComputerDesktop></HiMiniComputerDesktop>
                                        {lecture.title}
                                        {
                                          isLectureOpen ? <MdKeyboardArrowUp></MdKeyboardArrowUp> : <MdKeyboardArrowDown></MdKeyboardArrowDown>
                                        }
                                      </div>
                                      <div className='text-[16px]'>
                                        {Number(lecture?.timeDuration).toFixed(2)}
                                      </div>
                                    </div>
          
                                    <div className={`${isLectureOpen ? "h-14":'h-0'} bg-richblack-900 pt-2 text-sm text-richblack-300 pl-6`}>
                                      {lecture.description}
                                    </div>
                                  </div>
                              )
                            }
                              
                          )
                          }
                        </div>
                      </div>
                    </div>
                  )
                }
              )
              }
          </div>
        </div>
    </div>
  )
}

export default CourseDetailsCard