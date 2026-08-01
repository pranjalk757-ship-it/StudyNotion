import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Player} from 'video-react';
import 'video-react/dist/video-react.css';
import Iconbtn from '../common/Iconbtn';
import { update_course_progress } from '../../../services/operations/viewCourseDetails';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
function StudentViewVideo() {
    const {courseEntireData,courseSectionData,completedLectures} = useSelector((state)=>state.viewCourse);

    const [videoData,setVideoData] = useState('');
    const [videoEnded,setVideoEnded] = useState(false);
    const [playing,setPlaying] = useState(false);
    const [loading,setLoading] = useState(false);
    const location = useLocation();
    const {courseId,sectionId,subSectionId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth)

    const playerRef = useRef(null);
    function setVideoSpecificDetails(){
        if(!courseId || !sectionId || !subSectionId){
            return;
        }

        const filterData = courseSectionData?.filter((data)=>data?._id === sectionId);
        const filterVideoData = filterData?.[0]?.subSection?.filter((data)=>data?._id === subSectionId);

        setVideoData(filterVideoData?.[0]);
        setVideoEnded(false);
    }

    useEffect(()=>{
        setVideoSpecificDetails();
    },[courseEntireData,courseSectionData,location.pathname])

    const isFirstVideo = ()=>{
        const currentSectionIndex = courseSectionData?.findIndex((data)=>data?._id === sectionId);

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data?._id === subSectionId);

        if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
            return true;
        }
        else{
            return false;
        }
    }

    const isLastVideo = ()=>{
        const currentSectionIndex = courseSectionData?.findIndex((data)=>data?._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex((data)=>data?._id === subSectionId);

        const totalLectures = courseSectionData[currentSectionIndex]?.subSection?.length;

        if(currentSectionIndex === courseSectionData?.length - 1 && currentSubSectionIndex === totalLectures-1){
            return true;
        }
        else{
            return false;
        }
    }

    const goToNextVideo = ()=>{
        const currentSectionIndex = courseSectionData?.findIndex((data)=>data?._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex((data)=>data?._id === subSectionId);

        const totalSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;

        if(currentSubSectionIndex !== totalSubSections-1){
            const nextSubSectionId =courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex+1]?._id
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }
        else{
            const nextSectionId = courseSectionData[currentSectionIndex+1]._id;
            const nextSubSectionId = courseSectionData[currentSectionIndex+1]?.subSection[0]?._id
            navigate(`/course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }

    const goToPrevVideo = ()=>{
        const currentSectionIndex = courseSectionData?.findIndex((data)=>data?._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex((data)=>data?._id === subSectionId);

        if(currentSubSectionIndex !== 0){
            const prevSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex-1]?._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
        }
        else{
            const prevSectionId = courseSectionData[currentSectionIndex-1]?._id;
            const totalSubsection = courseSectionData[currentSectionIndex-1]?.subSection?.length;
            const prevSubSectionId = courseSectionData[currentSectionIndex-1]?.subSection?.[totalSubsection-1]?._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
        }
    }

    async function completeHandler(){
        setLoading(true);
        try{
            const result = await dispatch(update_course_progress({courseId,subSectionId,token}));
            if(result){
                dispatch(updateCompletedLectures(subSectionId));
            }
        }
        catch(error){
            console.log("Error occurred in completed lecture handler",error);
        }
        setLoading(false);
    }
  return (
    <div className='text-white w-[80%] mx-auto mt-20'>
        {
            !videoData  ? 
            <div>
                <p>No Data Found</p>
            </div>
            :
            <div className=' w-full relative z-0'>
                <Player
                    ref={playerRef}
                    src={videoData?.videoUrl}
                    controls={true}
                    width='100%'
                    height='100%'
                    className='w-full aspect-video mt-10 '
                    onEnded={()=>{
                            setPlaying(false);
                            setVideoEnded(true);
                        }}
                >
                </Player>
                    {
                        videoEnded &&
                        <div className='mt-2 flex flex-row gap-2'>
                            {
                                !completedLectures?.includes(videoData?._id) &&
                                <Iconbtn
                                    disabled={loading}
                                    text='Mark as completed'
                                    onClick={completeHandler}
                                ></Iconbtn>
                            }
                            <Iconbtn
                                text='Rewatch'
                                onClick={()=>{
                                    if(playerRef.current){
                                        playerRef.current.seek(0);
                                        playerRef.current.play();
                                        setVideoEnded(false);
                                        setPlaying(true);
                                    }
                                }}
                            ></Iconbtn>
                            <div>
                                {
                                    !isFirstVideo() &&
                                    <button
                                        onClick={goToPrevVideo}
                                    >
                                        prev
                                    </button>
                                }
                                {
                                    !isLastVideo() &&
                                    <button
                                        onClick={goToNextVideo}
                                    >
                                        Next
                                    </button>
                                }
                            </div>
                        </div>

                    }

                <div className='mt-2'>
                    <div className='text-2xl'>
                        <p>{videoData?.title}</p>
                    </div>
                    <div className='text-sm text-richblack-100 mt-2 '>
                        <p>{videoData?.description}</p>
                    </div>
                    <div className='text-md text-richblack-50 mt-2'>
                        <p>{videoData?.createdAt?.split('T')[0]}</p>
                    </div>
                </div>
            </div>


        }
    </div>
  )
}

export default StudentViewVideo