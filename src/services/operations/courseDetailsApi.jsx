import { apiconnector } from "../apiconnector";
import toast from "react-hot-toast";
import { categories, courseEndPoints } from "../apis";

    const {
        CATEGORIES_API,
    } = categories

    const{
        EDIT_COURSE_API,
        CREATE_COURSE_API,
        CREATE_SECTION_API,
        EDIT_SECTION_API,
        DELETE_SECTION_API,
        CREATE_SUBSECTION_API,
        UPDATE_SUBSECTION_API,
        DELETE_SUBSECTION_API,
        GET_INSTRUCTOR_COURSES,
        DELETE_COURSE_API,
        GET_COURSE_DETAILS
    } = courseEndPoints




    
export const get_all_categories = ()=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        let result = [];
        try{
            const response = await apiconnector("GET",CATEGORIES_API)

            console.log("Response of get all categoreis",response?.data)

            if(!response?.data?.success){
                throw new Error("Unable to get response of get all categories")
            }

            result = response?.data?.categorydetails;
            toast.success("fetched categories")
        }
        catch(err){
            console.log("Error occurred while fetching categories",err);
            toast.error("Unable to get categories")
        }
        toast.dismiss(toastId);
        return result;
    }
}


export const edit_course = ({data,token})=>{
    return async(dispatch)=>{
        let result = null;
        const toastId = toast.loading('Loading...');
        try{
            console.log("formData ",data);
            console.log('token',token);
            const response = await apiconnector('POST',EDIT_COURSE_API,data,{
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`
            })

            console.log("Response of edit course api",response);
            if(!response.data.success){
                throw new Error('Unable to fetch edit course response');
            }

            result = response?.data?.data;
            toast.success("Course edit successfully");
        }
        catch(err){
            console.log("error occurred in edit course ",err);
            toast.error("Unable to edit course");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export const add_course_details = ({formData,token}) =>{
    return async(dispatch)=>{
        let result = null;
        const toastId = toast.loading('Loading...');
        try{
            const response = await apiconnector('POST',CREATE_COURSE_API,formData,{
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`
            })

            console.log("response of add course details ",response);
            if(!response.data.success){
                throw new Error('Unable to fetch response of add course details')
            }

            toast.success('Course Details added successfully');
            result = response?.data?.data;
        }
        catch(err){
            console.log("error occurred in adding course Details",err);
            toast.error('Failed to add course details')
        }
        toast.dismiss(toastId)
        return result;
    }
}

export const get_course_detail = ({courseId})=>{
    return async(dispatch)=>{
        const toastId = toast.loading('Loading...');
        let result= [];
        try{
            const response = await apiconnector("POST",GET_COURSE_DETAILS,{courseId});

            console.log("Response of get course details ",response);

            if(!response?.data?.success){
                throw new Error("Unable to get response of get course details");
            }

            result = response.data.data;
            toast.success("Course details fetched successfully")
        }
        catch(err){
            console.log("Error occurred in get course details",err);
            toast.error("Failed to fetch course details");
        }
        toast.dismiss(toastId);
        return result;
    }
}


export const create_section = ({data,token})=>{
    return async(dispatch)=>{
        const toastId = toast.loading('Loading...')
        let result = null;
        try{
            const response = await apiconnector('POST',CREATE_SECTION_API,data,{
                Authorization:`Bearer ${token}`
            });

            console.log('Response of create section',response);

            if(!response?.data?.success){
                throw new Error('Unable to fetch response of create section')
            }

            result = response?.data?.courseDetail
            toast.success("Section created successfully")
        }
        catch(err){
            console.log("Error occurred in creating section",err);
            toast.error("Failed to create section")
        }
        toast.dismiss(toastId);
        return result;
    }
}


export const edit_section = ({data,token})=>{
    return async(dispatch)=>{
        const toastId = toast.loading('Loading...');
        let result = null;
        try{
            const response = await apiconnector('POST',EDIT_SECTION_API,data,{
                Authorization:`Bearer ${token}`
            })

            console.log("Response of edit section name",response);

            if(!response?.data?.success){
                throw new Error('Unable to fetch response of edit section name')
            }

            toast.success("Section Name editted successfully")
            result = response?.data?.data
        }
        catch(err){
            console.log("Error occurred in editing section name",err);
            toast.error("Failed to edit section name");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export const delete_section = ({data,token})=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        let result = null;
        try{
            const response = await apiconnector("POST",DELETE_SECTION_API,data,{
                Authorization:`Bearer ${token}`
            })

            console.log("Response of delete section api",response);

            if(!response?.data?.success){
                throw new Error('Unable to fetch response of delete section api');
            }

            result = response?.data?.data;
            toast.success("Section deleted successfully")
        }
        catch(err){
            console.log("Error occurred in deleting section ",err);
            toast.error("Failed to delete section")
        }
        toast.dismiss(toastId);
        return result;
    }
}

export const create_subsection = ({data,token})=>{
    return async(dispatch)=>{
        const toastId = toast.loading('Loading...');
        let result = null;
        try{
            const response = await apiconnector("POST",CREATE_SUBSECTION_API,data,{
                Authorization:`Bearer ${token}`
            })

            console.log("Response of create subsection",response);

            if(!response?.data?.success){
                throw new Error('Unable to fetch response of create subsection')
            }

            result = response.data.data;
            toast.success("SubSection created successfully")
        }
        catch(err){
            console.log("Error occurred in subsection creation",err);
            toast.error("Failed to create sub-section")
        }
        toast.dismiss(toastId);
        return result;
    }
}

export const update_subsection = ({data,token})=>{
    return async(dispatch)=>{
        const toastId = toast.loading('Loading...')
        let result = null;
        try{
            console.log("data ye raha",data);
            console.log('token',token);
            const response = await apiconnector("POST",UPDATE_SUBSECTION_API,data,{
                Authorization:`Bearer ${token}`
            })

            console.log("Response of update subsection",response);

            if(!response?.data?.success){
                throw new Error('Unable to fetch response of update sub-section')
            }

            result = response?.data?.data;
            toast.success("Sub-section updated successfully")
        }
        catch(err){
            console.log("Error occurred in updating subsection",err);
            toast.error("Failed to update sub-section")
        }
        toast.dismiss(toastId);
        return result;
    }
}

export const delete_subsection = ({data,token})=>{
    return async(dispatch)=>{
        const toastId = toast.loading('Loading...');
        let result = null;
        try{
            const response = await apiconnector('POST',DELETE_SUBSECTION_API,data,{
                Authorization:`Bearer ${token}`
            })

            console.log('Response of delete sub-section',response);

            if(!response?.data?.success){
                throw new Error('Unable to fetch response of delete sub-section')
            }

            toast.success("Sub-section deleted successfully")
            result = response?.data?.data
        }
        catch(err){
            toast.error("Failed to delete sub-section");
            console.log("Error occurred in deleting subsection",err);
        }
        toast.dismiss(toastId);
        return result;
    }
}


export const fetch_instructor_courses = ({token})=>{
    return async(dispatch)=>{
        const toastId = toast.loading('Loading');
        let result = null;
        try{
            const response = await apiconnector('GET',GET_INSTRUCTOR_COURSES,null,{
                Authorization:`Bearer ${token}`
            })

            console.log('Response of all instructor courses ',response);

            if(!response?.data?.success){
                throw new Error('Unable to get all instructor courses response');
            }

            result = response.data.data;
            toast.success("Courses fetched successfully")
        }
        catch(err){
            console.log("Error occurred in fetching all courses of instructor");
            toast.error('Failed to fetch courses')
        }
        toast.dismiss(toastId);
        return result;
    }
}

export const delete_course = ({courseId,token})=>{
    return async(dispatch)=>{
        const toastId = toast.loading('Loading...');
        try{
            console.log("courseId",courseId);
            console.log('Token',token)
            const response = await apiconnector("DELETE",DELETE_COURSE_API,{courseId},{
                Authorization:`Bearer ${token}`
            })

            console.log("Response of delete course ",response);

            if(!response?.data?.success){
                throw new Error('Unable to fetch response of delete course');
            }

            toast.success('Course deleted successfully')
        }
        catch(err){
            console.log("Error occurred in delete course",err);
            toast.error("Failed to delete course")
        }
        toast.dismiss(toastId);
    }
}