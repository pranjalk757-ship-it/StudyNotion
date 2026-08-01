import toast from "react-hot-toast";
import { paymentEndPoints } from "../apis";
import { apiconnector } from "../apiconnector";
import rzpLogo from '../../assets/Logo/rzp_logo.png'
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";
const {
    CAPTURE_PAYMENT_API,
    VERIFY_PAYMENT_API,
    SEND_PAYMENT_SUCCESSFULL_EMAIL
} = paymentEndPoints

const loadScript = (src)=>{
    return new Promise((resolve)=>{
        const script = document.createElement('script');

        script.src = src;

        script.onload = ()=>{
            resolve(true);
        }

        script.onerror = ()=>{
            resolve(false);
        }

        document.body.appendChild(script);
    })
}


export async function buy_course(token,courses,userDetails,navigate,dispatch){
    const toastId = toast.loading('Loading...');
    try{
        const response = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if(!response){
            toast.error("Razorpay SDK failed to load");
            return;
        }

        // initiate order
        const orderResponse = await apiconnector("POST",CAPTURE_PAYMENT_API,{courses},{
            Authorization:`Bearer ${token}`
        })

        console.log("Order response ......",orderResponse);

        if(!orderResponse?.data?.success){
            throw new Error("Unable to fetch order response");
        }
        console.log("Razorpay key is",process.env.REACT_APP_RAZORPAY_KEY)

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name:"StudyNotion",
            description: "Thank you for purchasing course",
            image: rzpLogo,
            prefill: {
                name:`${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email
            },
            handler: function(response){
                // send payment successfull email
                payment_successfull_email(response,orderResponse.data.data.amount,token);
                // verify payment
                verify_payment({...response,courses},token,navigate,dispatch)
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open();
        paymentObject.on("payment.failed",function(response){
            toast.error("Oops, Payment failed");
            console.log(response.error);
        })
    }
    catch(err){
        console.log("error occurred in buy course",err);
        toast.error("Failed to buy Course");
    }
    toast.dismiss(toastId);
}

const payment_successfull_email = async(response,amount,token)=>{
    try{
        console.log("orderId",response.razorpay_order_id);
        console.log("paymentId",response.razorpay_payment_id);
        console.log("amount",amount);
        await apiconnector("POST",SEND_PAYMENT_SUCCESSFULL_EMAIL,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount
        },{
            Authorization:`Bearer ${token}`
        })
    }
    catch(err){
        console.log("Error occurred in sending payment successfull email",err);
        toast.error("Failed to sent Payment successfull email")
    }
}

const verify_payment = async(bodyData,token,navigate,dispatch)=>{
    const toastId = toast.loading('Loading...');
    dispatch(setPaymentLoading(true));
    try{
        console.log("body data",bodyData)
        const response = await apiconnector("POST",VERIFY_PAYMENT_API,bodyData,{
            Authorization:`Bearer ${token}`
        })

        console.log("Response of verify payments ",response);

        if(!response?.data?.success){
            throw new Error('Unable to fetch response of verify payment')
        }

        toast.success("You are successfully added to course");
        dispatch(resetCart());
        navigate('/dashboard/enrolled-courses')
    }
    catch(err){
        console.log("error ",err);
        console.log("Error occurred in verifying payment");
        toast.error("Payment Verifiaction Failed")
    }
    dispatch(setPaymentLoading(false));
    toast.dismiss(toastId);
}