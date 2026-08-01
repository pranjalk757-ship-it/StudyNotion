const {instance} = require('../configuration/razorpay')
const User = require('../models/user');
const Course = require('../models/course');
const CourseProgress = require('../models/courseProgress')
const mongoose  = require('mongoose');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail')
const {mailsender} = require('../utils/mailsender');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessfullEmail');
const crypto = require('crypto')
exports.capturePayment = async(req,res)=>{
    try{
        const {courses} = req.body;
        const userId = req.candidate.id;
        console.log("courses. ",courses)
        if(courses.length === 0){
            return res.status(500).json({
                success:false,
                message:"Courses are not present"
            })
        }
        let totalAmount = 0;
        for(const courseId of courses){
            const course = await Course.findById(courseId);

            if(!course){
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(500).json({
                    success:false,
                    message:"Student already enrolled in course"
                })
            }

            totalAmount += course.price; 
            
        }
        console.log("Total amount.  ",totalAmount)
        const options = {
            amount: totalAmount * 100,
            currency: 'INR',
            receipt: Math.random(Date.now()).toString()
        }
        console.log("options",options)
        try{
            const paymentResponse = await instance.orders.create(options);
            console.log("payment response",paymentResponse)
            return res.status(200).json({
                success:true,
                message:"Order captured successfully",
                data:paymentResponse
            })
        }
        catch(err){
            console.log("error ",err);
            return res.status(500).json({
                success:false,
                message:"Could not initiate order"
            })
        }
    }
    catch(err){
        console.log("Error occurred in capture payment",err);
        return res.status(500).json({
            success:false,
            message:"Error occurred in capture payment"
        })
    }
}

exports.verifyPayment = async(req,res)=>{
    try{
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const {courses} = req.body;
        const userId = req.candidate?.id;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
            return res.status(404).json({
                success:false,
                message:"Payment failed"
            })
        }

        let body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256",process.env.Razorpay_Secret)
            .update(body.toString())
            .digest('hex');

        if(expectedSignature !== razorpay_signature){
            return res.status(500).json({
                success:false,
                message:"Payment verification failed"
            })
        }
       
            // enroll student
            await studentEnrolled(courses,userId);
            // return response
            return res.status(200).json({
                success:true,
                message:"Payment verified successfully"
            })
        
    }
    catch(err){
        console.log("error aa gaya",err);
        return res.status(500).json({
            success:false,
            message:"Error occurred in verifying payment"
        })
    }
}


const studentEnrolled = async(courses,userId)=>{
    try{
        if(!courses || !userId){
            throw new Error("Missing courses or userId")
        }

        for(const courseId of courses){
            console.log("Enrolling in:", courseId);
            const enrolledCourse = await Course.findByIdAndUpdate(courseId,{
                $push:{studentEnrolled:userId}
            },{new:true}).exec();

            if(!enrolledCourse){
                throw new Error("Course not found")
            }

            const courseProgress = await CourseProgress.create({
                courseId:courseId,
                userId:userId,
                completedVideos:[]
            })

            const enrolledStudent = await User.findByIdAndUpdate(userId,{
                $push:{
                    courses:courseId,
                    courseProgress:courseProgress?._id,
                }
            },{new:true}).exec();

            if(!enrolledStudent){
                throw new Error("user not found")
            }

            await mailsender(enrolledStudent.email,
                                `Successfully Enrolled in ${enrolledCourse.courseName}`,
                                courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
                            )
        }
        return true;
    }
    catch(err){
        console.log("Error occurred in student enrolled fuction",err);
        return false;
    }
}


exports.sendPaymentSuccessfullEmail = async(req,res)=>{
    try{
        const {orderId,paymentId,amount} = req.body;

        const userId = req.candidate?.id;

        if(!orderId || !paymentId || !amount || !userId){
            return res.status(404).json({
                success:false,
                message:"Missing properties"
            })
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        await mailsender(user.email,
            `Payment Successfull of amount ${amount}`,
            paymentSuccessEmail(`${user.firstName} ${user.lastName}`,amount,orderId,paymentId)
        )

        return res.status(200).json({
            success:true,
            message:"Payment successfull mail send"
        })
    }
    catch(err){
        console.log("error aa gaya",err);
        return res.status(500).json({
            success:false,
            message:"Error occurred in sending successfull payment email"
        })
    }
}

// exports.capturePayment = async(req,res)=>{
//     // fetch course id and user id
//     const courseId = req.body.id;
//     const userId = req.candidate.id;

//     // validate course id
//     if(!courseId){
//         return res.status(400).json({
//             success:false,
//             message:"course not found"
//         })
//     }
//     // fetch course details
//     let course;
//     try{
//         course = await Course.findById(courseId);

//         if(!course){
//             return res.status(400).json({
//                 success:false,
//                 message:"Course detail not found"
//             })
//         }

//         // check if student is enrolled or not
//         const uid = mongoose.Schema.Types.ObjectId(userId);
//         if(course.studentEnrolled.includes(uid)){
//             return res.status(401).json({
//                 success:false,
//                 message:"Student is already enrolled"
//             })
//         }

//     }
//     catch(err){
//         return res.status(500).json({
//             success:false,
//             message:err.message
//         })
//     }
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId,
//             userId
//         }
//     }

//     try{
//         const paymentResponce = await instance.orders.create(options);

//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponce.id,
//             currency:paymentResponce.currency,
//             amount:paymentResponce.amount,
//         })
//     }
//     catch(err){
//         return res.status(500).json({
//             success:false,
//             message:"Error occured in capturing payment",
//             error:err.message
//         })
//     }
// }






// exports.verifySignature = async(req,res)=>{
//     // define wehooksecret
//     const webhooksecret = "12345678";

//     // fetch signature from razorpay
//     const signature = req.headers['x-razorpay-signature'];
//     // encrypt webhooksecret 

//     const shasum = crypto.createHmac("sha256",webhooksecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");
//     // match both signature
//     if(digest === signature){
//         console.log("Payment is authorised")

//         try{
//             const {courseId,userId} = req.body.payload.payment.entity.notes;

//             // enroll student in course
//             const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId},{$push:{studentEnrolled:userId}},{new:true});
//             if(!enrolledCourse){
//                 return res.status(404).json({
//                     success:false,
//                     message:"Course not found"
//                 })
//             }

//             const enrolledStudent = await User.findByIdAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true});
//             if(!enrolledStudent){
//                 return res.status(404).json({
//                     success:false,
//                     message:"User not found"
//                 })
//             }

//             const emailResponse = await mailsender(enrolledStudent.email,
//                                                     "Congratulation from StudyNotion",
//                                                     "Congratulations, you are onboarded into new StudyNotion Course"
//             )


//             return res.status(200).json({
//                 success:true,
//                 message:"User Enrolled in course , Successfuly..."
//             })
//         }
//         catch(err){
//             return res.status(500).json({
//                 success:false,
//                 message:err.message
//             })
//         }
//     }
//     else{
//         return res.status(500).json({
//             success:false,
//             message:"Payment is not authorised"
//         })
//     }
// }