const { populate } = require('../models/Category');
const Course = require('../models/course');
const CourseProgress = require('../models/courseProgress');
const Profile = require('../models/Profile');
const User = require('../models/user');
const { convertSecondToDuration } = require('../utils/convertSecondToDuration');
const {uploadImageToCloudinary} = require('../utils/ImageUploader')

exports.updateProfile = async(req,res)=>{
    try{
        console.log('ye raha ji error',req.body)
        console.log('ye rahi userId',req.candidate.id)
        const {dateOfBirth="",about="",gender,phoneNumber} = req.body;
        const userId = req.candidate.id;
        // validation
        if(!gender || !phoneNumber || !userId){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        // finding profile
        const userDetail = await User.findById(userId);
        if(!userDetail){
            return res.status(400).json({
                success:false,
                message:"Unable to find User"
            })
        }

        const profileId = userDetail.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        if(!profileDetails){
            return res.status(400).json({
                success:false,
                message:"Cant find profile details"
            })
        }
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.phoneNumber = phoneNumber;

        // creating entry in database

        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails:profileDetails
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred while updating profile, try again...",
            error:err.message
        })
    }
}


exports.deleteProfile = async(req,res)=>{
    try{
        // find id
        console.log("user",req.candidate)
        const userId = req.candidate.id;

        const userdetails = await User.findById(userId);
        if(!userdetails){
            return res.status(400).json({
                success:false,
                message:"Unable to find User"
            })
        }

        // unenroll student from all the database

        const enrolledCourse = userdetails.courses;

        for(const courseId of enrolledCourse){
            await Course.findByIdAndUpdate(courseId,{$pull:{studentEnrolled:userdetails._id}},{new:true});
        }
        // delete profile

        await Profile.findByIdAndDelete(userdetails.additionalDetails);


        // delete User

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success:true,
            message:"User deleted Successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error occured in deleting User",
        })
    }
}


exports.getAllUserDetails = async(req,res)=>{
    try{
        const id = req.candidate.id;

        const userDetails = await User.find({}).populate({path:"additionalDetails"}).exec();
        return res.status(200).json({
            success:true,
            message:"All User Details are fetched successfully",
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred in fetching all the details",
            error:err.message
        })
    }
}


exports.getEnrolledCourses = async(req,res)=>{
    try{
        const userId = req.candidate.id;
        
        let userDetail = await User.findById(userId).populate({
            path:'courses',
            populate:{
                path:'courseContent',
                populate:{
                    path:'subSection'
                }
            }
        }).exec();

        if(!userDetail){
            return res.status(404).json({
                success:false,
                message:"user detail not found"
            })
        }

        userDetail = userDetail.toObject();

        const progressData = await CourseProgress.find({userId:userId});

        const progressMap = {};
        progressData.forEach((item)=>{
            progressMap[item.courseId.toString()] = item.completedVideos?.length
        })

        for(let i=0; i<userDetail.courses.length ;i++){
            let totalCourseDuration = 0;
            let totalLectures = 0;
            for(let j=0;j<userDetail?.courses[i]?.courseContent?.length ;j++){
                totalCourseDuration += (userDetail.courses[i].courseContent[j]?.subSection || []).reduce((acc,curr)=>{
                    return acc + parseInt(curr.timeDuration)
                },0)

                totalLectures += userDetail.courses[i].courseContent[j].subSection?.length;
            }

            userDetail.courses[i].totalDurationCourse = convertSecondToDuration(totalCourseDuration);

            const completedVideos = progressMap[userDetail?.courses[i]?._id.toString()] || 0;

            if(totalLectures === 0){
                userDetail.courses[i].progressPercentage = "100"
            }
            else{
                userDetail.courses[i].progressPercentage = Math.round((completedVideos/totalLectures)*100);
            }
        }
        return res.status(200).json({
            success:true,
            data:userDetail.courses
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.updateDisplayPicture = async(req,res)=>{
    try{
        const displayPicture = req.files.displayPicture;
        const userId = req.candidate.id;
        console.log("Ye raha url",displayPicture)
        const image = await uploadImageToCloudinary(displayPicture,process.env.FOLDER_NAME,1000,1000);
        console.log("ye response lo",image)
        console.log("user id ",userId)
        console.log("image secure url",image.secure_url)
        const userdetail = await User.findByIdAndUpdate(userId,
            {image:image.secure_url},
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Profile picture updated successfully",
            userdetail:userdetail
        })
        
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getInstructorStats = async(req,res)=>{
    try{
        const userId = req.candidate?.id;

        const courseDetails = await Course.find({instructor:userId});

        const courseData = courseDetails.map((course)=>{
            let totalStudentEnrolled = course.studentEnrolled.length;
            let totalAmountGenerated = course.price * totalStudentEnrolled;

            const courseDataStats = {
                courseId:course._id,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                totalAmountGenerated,
                totalStudentEnrolled
            }
            return courseDataStats;
        })

        return res.status(200).json({
            success:true,
            message:"Instructor stats are fetched successfully",
            data:courseData
        })

    }
    catch(err){
        console.log("Error occurred in fetching instructor stats",err);
        return res.status(500).json({
            success:false,
            message:"Failed to fetch instructor stats"
        })
    }
}