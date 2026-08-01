import toast from "react-hot-toast";
import { courseEndPoints } from "../apis";
import { apiconnector } from "../apiconnector";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData } from "../../slices/viewCourseSlice";


const {
    GET_FULL_COURSE_DETAILS,
    UPDATE_COURSE_PROGRESS,
    CREATE_RATING_API,
    FETCH_ALL_REVIEWS
}= courseEndPoints



export const get_full_course_details = ({courseId,token})=>{
    return async(dispatch)=>{
        const toastId = toast.loading('Loading...');
        let result = [];
        try{
            const response = await apiconnector("POST",GET_FULL_COURSE_DETAILS,{courseId},{
                Authorization:`Bearer ${token}`
            })

            console.log("Response of full course detail",response);

            if(!response?.data?.success){
                throw new Error("Unable to fetch response of get full cpourse details")
            }


            result = response.data.data;


dispatch(setCompletedLectures(result.completedVideos));
            toast.success("Course detail fetched successfully")
        }
        catch(error){
            console.log("Error occurred in fetch all course details",error);
            toast.error("Failed to get course details")
        }
        toast.dismiss(toastId);
        return result;
    }
}

export const update_course_progress = ({courseId,subSectionId,token})=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        let result = null;
        try{
            const response = await apiconnector("POST",UPDATE_COURSE_PROGRESS,{courseId,subSectionId},{
                Authorization:`Bearer ${token}`
            })

            console.log("Response of update course progress",response);

            toast.success("Course Progress Updated")
            result = true;
        }
        catch(err){
            console.log("Error occurred in update course progress",err);
            toast.error("failed to update course progress")
            result = false;
        }
        toast.dismiss(toastId);
        return result;
    }
}

export const create_rating_review = ({data,token})=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiconnector("POST",CREATE_RATING_API,data,{
                Authorization:`Bearer ${token}`
            })

            console.log("Response of create rating and review ",response);
            if(!response?.data?.success){
                throw new Error("Unable to fetch response of create rating and reviews");
            }

            toast.success("Rated Course successfully")
        }
        catch(err){
            console.log("Error occurr in rating and review",err);
            toast.error("Failed to give rating")
        }
        toast.dismiss(toastId);
    }
}

export const fetch_all_reviews = ()=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        let result = [];
        try{
            const response = await apiconnector("GET",FETCH_ALL_REVIEWS);

            console.log("Response of fetch all rating and reviews",response);

            if(!response?.data?.success){
                throw new Error("Unable to fetch response of all rating and reviews")
            }

            toast.success("Reviews fetched successfully");

            result = response.data.data;
        }
        catch(err){
            console.log("Error occurred in fetching all reviews",err);
            toast.error("Failed to fetch review")
        }
        toast.dismiss(toastId)
        return result;
    }
}