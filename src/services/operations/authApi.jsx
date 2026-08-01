import { apiconnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setToken,setSignupData,setLoading } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { stringify } from "postcss";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";
const {SENDOTP_API,LOGIN_API,SIGNUP_API,RESETPASSTOKEN_API,RESETPASSWORD_API} = endpoints;

export const sendOtp = ({email,navigate})=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            console.log("Yaha aaya hai")
            const response = await apiconnector("POST",SENDOTP_API,{
                email
            });
    
            console.log("Send otp api response ",response)
    
            console.log(response.data.success);
    
            if(!response.data.success){
                throw new Error("Not able to send otp ");
            }
    
            toast.success("OTP send on email");
            navigate('/otp-verification')
            
        }
        catch(err){
            console.log("Error aa gaya",err)
            toast.error("Unable to send OTP")
        }
        dispatch(setLoading(false));
    }
}


export const signup =  ({
    firstName,lastName,email,password,confirmPassword,accountType,otp,navigate
})=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await apiconnector("POST",SIGNUP_API,{firstName,lastName,email,password,confirmPassword,accountType,otp});
    
            console.log("Signup api response " ,response);
            console.log(response.data.success);
            
            if(!response.data.success){
                throw new Error ("Unable to get  Signup Api response")
            }
    
            toast.success("Signup done successfully");
            navigate("/login");
        }
        catch(err){
            console.log("Error occurred in signup ",err);
            toast.error("Signup Failed");
            navigate('/signup')
        }
        dispatch(setLoading(false));
    }
}



export const login = ({email,password,navigate})=>{
    return async(dispatch)=>{  
        dispatch(setLoading(false));
        try{    
            const response = await apiconnector("POST",LOGIN_API,{email,password});
    
            console.log("Login api response" , response);
            console.log(response.data.success);
    
            if(!response.data.success){
                throw new Error("Unable to fetch Login Api response");
            }
            
            toast.success("Login successfully");
            dispatch(setToken(response.data.token));
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))
            
            const userImage = response.data?.user?.image ?
                    response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.firstName} ${response.data.lastName}`
    
            dispatch(setUser({...response.data.user,  image :userImage}))
            navigate('/dashboard/my-profile')
        }
        catch(err){
            console.log("Error occurred in Login ",err);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
    }
}

export const resetPasswordToken = ({email,setEmailSent})=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{    
            const response = await apiconnector("POST",RESETPASSTOKEN_API,{email});
    
            console.log("Reset password token response", response);
            console.log(response.data.success);
    
            if(!response.data.success){
                throw new Error("unable to fetch response of ResetPassword token");
            }
    
            toast.success("Password Reset link sent by email");
            setEmailSent(true);
        }
        catch(err){
            console.log("Error occurred in Reset Password Link", err);
            toast.error("Unable to sent Reset-Password-Link")
        }
        dispatch(setLoading(false));
    }
}


export const resetPassword = ({password,confirmPassword,token,setResetComplete})=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await apiconnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});

            console.log("Reset password api response ",response);
            console.log(response.data.success);
            if(!response.data.success){
                throw new Error("Unable to fetch reset password response");
            }

            toast.success("Password Reset Successfully");
            setResetComplete(true);
        }
        catch(err){
            console.log("Error occured in reset password",err);
            toast.error("Unable to Reset Password")
        }
    }
}

export const logout = ({navigate})=>{
    return async(dispatch)=>{
        dispatch(setToken(null));
        dispatch(resetCart(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        toast.success("Logged Out");
        navigate('/');
    }
}