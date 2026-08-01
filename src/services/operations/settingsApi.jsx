import { apiconnector } from "../apiconnector"
import { settings } from "../apis"
import { setUser } from "../../slices/profileSlice"
import toast from "react-hot-toast"

export const update_my_profile = ({token,formData})=>{
    return async (dispatch)=>{
        const toastId = toast.loading("Updating....")
        try{
            console.log("pehla",formData)
            console.log("token",token);
            console.log("api",settings.UPDATE_MY_PROFILE)
            const response = await apiconnector("PUT",settings.UPDATE_MY_PROFILE,formData,{
                Authorization : `Bearer ${token}`
            })
            console.log("dusra");
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            console.log("Authorization response is",response);

            const userImage = response?.data?.profileDetails?.image ?
                        response.data.profileDetails?.image : 
                        `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.profileDetails?.firstName} ${response.data.profileDetails?.lastName}`
            dispatch(setUser(
                {...response.data.profileDetails,image: userImage}
            ))

            toast.success("Profile Updated successfully")
        }
        catch(err){
            console.log("Error occurred in update my profile",err.message);
            toast.error("Profile update failed")
        }
        toast.dismiss(toastId);
    }
}

export const update_profile_picture = ({token,formData})=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        try{
            
            const response = await apiconnector('PUT',settings.UPDATE_PROFILE_PICTURE,formData,{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            })
            
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Profile picture updated")
            dispatch(setUser({...response?.data?.userdetail,image: response?.data?.userdetail?.image}));
            localStorage.setItem("user",JSON.stringify(response?.data?.userdetail))
        }
        catch(err){
            console.log("Error occurred in uploading profile picture",err);
            toast.error("Profile picture not updated")
        }
        toast.dismiss(toastId);
    }
}

export const update_password = ({token,email,formData})=>{
    return async(dispatch)=>{
        try{
            const response = await apiconnector("POST",settings.UPDATE_PASSWORD,{email,...formData},{
                Authorization: `Bearer ${token}`
            })

            console.log("Response of update_password",response.data);
            if(!response.data.success){
                throw new Error("Unable to get response of update_password")
            }

            // dispatch(setUser(response.data));
            toast.success("Password Updated")
        }
        catch(err){
            console.log("Error occurred in updating password",err);
            toast.error("Password update failed")
        }
    }
}

export const delete_profile = ({token,navigate})=>{
    return async(dispatch)=>{
        try{
            const response = await apiconnector("DELETE",settings.DELETE_PROFILE,null,{
                Authorization:`Bearer ${token}`
            })

            console.log("Response of delete profile",response.data);

            if(!response.data.success){
                throw new Error("Error occurred in deleting Profile")
            }
            navigate('/login')
            toast.success("Account Deleted")
            localStorage.clear();
        }
        catch(err){
            console.log("Error occurred in deleting profile",err);
            toast.error("Account Deletion Failed")
        }
    }
}