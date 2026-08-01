import { apiconnector } from "../apiconnector"
import { profile } from "../apis"
import toast from "react-hot-toast";
const {
    GET_ENROLLED_COURSES,
    GET_INSTRUCTOR_STATS
} = profile;



export const get_enrolled_courses = ({token})=>{
    return async(dispatch)=>{
        let result = [];
        const toastId = toast.loading("Loading....")
        try{
            const response = await apiconnector("GET",GET_ENROLLED_COURSES,null,{
                Authorization: `Bearer ${token}`
            })

            console.log("Response of get enrolled courses ",response.data);

            if(!response.data.success){
                throw new Error("Unable to get response of enrolled courses")
            }
            result = response.data.data;
            
        }
        catch(err){
            console.log("Error occurred in fetching enrolled courses",err);
            toast.error("Failed to get enrolled courses")
        }
        toast.dismiss(toastId);
        return result;
    }
}

export const get_instructor_stats = ({token})=>{
    return async(dispacth)=>{
        const toastId = toast.loading("Loading...");
        let result = [];
        try{
            const response = await apiconnector("GET",GET_INSTRUCTOR_STATS,null,{
                Authorization:`Bearer ${token}`
            })

            console.log("Response of instructor stats ",response);
            if(!response?.data?.success){
                throw new Error("Unable to fetch instructor stats")
            }

            toast.success("Instructor stats fetched successfully");
            result = response.data.data
        }
        catch(err){
            console.log("Error occurred in fetching instructor stats",err);
            toast.error("Failed to fetch instructor stats")
        }
        toast.dismiss(toastId);
        return result;
    }
}