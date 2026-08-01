import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
function StudentViewSidebar({reviewModal,setReviewModal}) {
    const {courseEntireData,courseSectionData,totalNoOfLectures,completedLectures} = useSelector((state)=>state.viewCourse)
    const [activeSection,setActiveSection] = useState('');
    const [activeSubSection,setActiveSubSection] = useState('');
    const {sectionId,subSectionId,courseId} = useParams();
    const navigate = useNavigate();
    function saveReviewHandler(){

    }
    

    function set_active_flag(){
        if(!courseSectionData){
            return;
        }
        console.log("completedLectures:", completedLectures);
        console.log("course entire data",courseEntireData);
        console.log("course section data",courseSectionData);
        console.log("course leactue",totalNoOfLectures);
        const sectionIndex = courseEntireData?.courseContent?.findIndex((data)=>data?._id === sectionId);
        const subsectionIndex = courseSectionData?.[sectionIndex]?.subSection?.findIndex((data)=>data?._id === subSectionId);
        const activesubsectionId = courseSectionData?.[sectionIndex]?.subSection?.[subsectionIndex]?._id;
        setActiveSection(courseEntireData?.courseContent?.[sectionIndex]?._id);
        setActiveSubSection(activesubsectionId);
        console.log("section id",activeSection)
        console.log("section id",activeSubSection)
    }

    useEffect(()=>{
        set_active_flag();
    },[courseEntireData,courseSectionData,sectionId,subSectionId])
  return (
    <div className='text-white mt-10'>
        <div>
            <div className='flex flex-row gap-4 items-center pl-4'>
                <p className='text-lg '>{courseEntireData?.courseName}</p>
                <p className='text-xs text-caribbeangreen-100 font-bold'>{completedLectures?.length > 0 ? completedLectures : 0}/{totalNoOfLectures}</p>
            </div>
            <div className='pl-4 '>
                <button
                    className='bg-yellow-100 rounded-md mt-2 text-black py-1 px-2 font-bold'
                    onClick={()=>setReviewModal(true)}
                >
                    Add Review
                </button>
            </div>
            <div className='w-[95%] bg-richblack-300 h-[1px]  mt-4 mx-auto '></div>
        </div>
        <div className='mt-4'>
            {
                courseSectionData?.map((section)=>(
                    <div>
                        <div className='bg-richblack-700'
                            onClick={()=>setActiveSection(section?._id)}
                        >
                            <p className='text-md py-2 pl-4'>{section?.sectionName}</p>
                        </div>
                            {
                                activeSection === section?._id &&
                                
                                section?.subSection?.map((lecture)=>(
                                    <div className={`flex flex-row gap-4 pl-6
                                        ${activeSubSection === lecture?._id ? "text-yellow-100":"bg-richblack-300" }
                                        `}
                                        onClick={()=>{
                                            setActiveSubSection(lecture?._id)
                                            navigate(`/view-course/${courseId}/section/${section?._id}/sub-section/${lecture?._id}`)
                                        }}
                                    >
                                        <input
                                            type='checkbox'
                                            checked={completedLectures?.some(
                                            (id) => id.toString() === lecture._id.toString()
                                            )}
                                        ></input>
                                        <p>{lecture.title}</p>
                                    </div>
                                ))
                            }
                        <div>

                    </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default StudentViewSidebar