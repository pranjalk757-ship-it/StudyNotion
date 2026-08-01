import { apiconnector } from "../apiconnector";
import { categories } from "../apis";
import toast from "react-hot-toast";

const {
    GET_CATEGORIES_PAGE_DETAILS
} = categories


export const get_category_page_details = ({categoryId})=>{
    return async(dispatch)=>{
        const toastId = toast.loading('Loading...');
        let result = null;
        try{
            const response = await apiconnector("POST",GET_CATEGORIES_PAGE_DETAILS,{categoryId});

            console.log("Response of get category page details",response);

            if(!response?.data?.success){
                throw new Error("Unable to fetch category page details response")
            }

            result = response.data.data;
            toast.success("Successfully fetched")
        }
        catch(err){
            console.log("Error occurred in category page details",err);
            toast.error('Failed to fetched');
        }
        toast.dismiss(toastId);
        return result;
    }
}

