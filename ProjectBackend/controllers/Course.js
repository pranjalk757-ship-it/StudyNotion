const Course = require('../models/course')
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/ImageUploader")
const User = require('../models/user');
const { json } = require('express');
const Section = require('../models/Section')
const SubSection = require('../models/subSection');
const subSection = require('../models/subSection');
const { convertSecondToDuration } = require('../utils/convertSecondToDuration');
const CourseProgress = require('../models/courseProgress');
const { default: mongoose } = require('mongoose');
require("dotenv").config();
exports.createCourse = async(req,res)=>{
    try{
        let {courseName,courseDescription,whatYouWillLearn,price,categoryId,status,tag,instructions} = req.body;

        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !categoryId || !thumbnail || !tag || !instructions){
            return res.status(401).json({
                success:false,
                message:"All fields are mandatory",
            })
        }

        if(!status || status===undefined){
            status="Draft";
        }
        // fetching instructor id
        let instructorId = req.candidate.id; 
        
        const instructorDetails = await User.findById(instructorId);
        if(!instructorDetails){
            return res.status(401).json({
                success:false,
                message:"Instructor Not Found"
            })
        }
        
        // verify category
        const categoryDetails = await Category.findById(categoryId);
        if(!categoryDetails){
            return res.status(401).json({
                success:false,
                message:"Category are not valid"
            })
        }

        //. uplaod thumbnail to cloudinary
        console.log("Thumbnail",thumbnail)
        const thumbnailUpload =  await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)
        

        // create entry for course
        
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn:whatYouWillLearn,
            instructor:instructorId,
            category:categoryDetails._id,
            thumbnail:thumbnailUpload.secure_url,
            price,
            instructions:instructions,
            tag:tag
        })

        // create entry of Course in User Schema of instructor
        await User.findByIdAndUpdate(instructorId,{$push:{courses:newCourse._id}},{new:true});

        // create entry of course in Category 
        await Category.findByIdAndUpdate(categoryDetails._id,{$push:{courses:newCourse._id}},{new:true});
        console.log(newCourse);
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error occurred in course creation"
        })
    }
}


exports.getAllCourse = async(req,res)=>{
    try{
        const allCourses = await Course.find({});

        return res.status(200).json({
            success:true,
            allCourses,
            message:"All courses are fetched successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error occurred in fetching all courses"
        })
    }
}




exports.getCourseDetails = async(req,res)=>{
    try{
        const {courseId} = req.body;
        if(!courseId){
            return res.status(404).json({
                success:false,
                message:"Course id not found"
            })
        }
        const courseDetails = await Course.findById(
                                                    {_id:courseId}
                                                )
                                                .populate({
                                                            path:"instructor",
                                                            populate:{
                                                                path:"additionalDetails"
                                                            },
                                                        })
                                                .populate({
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"subSection"
                                                    }
                                                })
                                                .populate("ratingAndReviews")
                                                .populate("category")
                                                .exec();

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Course details are not found"
            })
        }

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((section)=>{
            section?.subSection?.forEach((subSection)=>{
                totalDurationInSeconds += parseInt(subSection.timeDuration);
            })
        })

        const totalDuration = convertSecondToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success:true,
            message:"Course details are fetched successfully",
            data:courseDetails,
            totalDuration:totalDuration
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error occurred in fetching course details"
        })
    }
}

exports.getFullCourseDetails = async(req,res)=>{
    try{
        const {courseId} = req.body;

        if(!courseId){
            return res.status(404).json({
                success:false,
                message:"Missing courseId"
            })
        }

        const courseDetails = await Course.findById(courseId)
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        })
        .populate({
            path:"courseContent",
            populate:{
                path:'subSection'
            }
        })
        .populate({
            path:'ratingAndReviews'
        })
        .populate({
            path:"studentEnrolled"
        })
        .populate({
            path:"category"
        })

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }
        
        const courseProgressCount = await CourseProgress.findOne({courseId: new mongoose.Types.ObjectId(courseId)})

        console.log("courseProgressCount",courseProgressCount)

        let totalDurationInSeconds = 0;
        courseDetails?.courseContent.forEach((section)=>{
            section?.subSection.forEach((subSection)=>{
                totalDurationInSeconds += parseInt(subSection?.timeDuration);
            })
        })

        const totalDuration = convertSecondToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success:true,
            message:"Full course detail found successfully",
            data:courseDetails,
            totalDuration:totalDuration,
            courseProgressCount: courseProgressCount?.completedVideos ? courseProgressCount.completedVideos : []
        })
    }
    catch(error){
        console.log("error",error)
        return res.status(500).json({
            success:false,
            message:"Error occurred in getting full course details",
            error:error.message
        })
    }
}

exports.editCourseDetails = async(req,res)=>{

    try{
        const {courseId} = req.body;
        const updates = req.body;

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Cannot find course"
            })
        }

        if(req.files){
            const thumbnail = req.files.thumbnailImage;

            const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

            course.thumbnail =thumbnailImage.secure_url;
        }

        for(const key in updates){
            if(key === 'tag' || key === 'instructions'){
                course[key] = JSON.parse(updates[key]);
            }
            else{
                course[key] = updates[key];
            }
        }

        await course.save();

        const updatedCourseDetail = await Course.findById(courseId)
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        })
        .populate({
            path:"ratingAndReviews"
        })
        .populate({
            path:"category"
        })
        .populate({
            path:'courseContent',
            populate:{
                path:'subSection'
            }
        })
        .exec();

        return res.status(200).json({
            success:true,
            message:"Course updated successfully",
            data:updatedCourseDetail
        })
    }
    catch(err){
        console.log("Error aa gaya",err)
        return res.status(500).json({
            success:false,
            message:'Error occurred in edit course details',
            error:err
        })
    }
    
}

exports.getInstructorAllCourses = async(req,res)=>{
    try{
        const instructorId = req.candidate.id;

        const course = await Course.find({instructor:instructorId}).sort({createdAt:-1});

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Cannot find course"
            })
        }

        return res.status(200).json({
            success:true,
            message:'All instructor course are fetched successfully',
            data:course
        })
    }
    catch(err){
        console.log("error aa gaya ",err);
        return res.status(500).json({
            success:false,
            message:"Error occurred in fetching all instructor courses",
            error:err
        })
    }
    
}

exports.deleteCourse = async(req,res)=>{
    try{
        // fetch courseId from req.body
        const {courseId} = req.body;
        // validate course
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success:false,
                message:"cannot find course"
            })
        }
        // remove course from user model
        const studentEnrolled = course.studentEnrolled;

        for(const studentId of studentEnrolled){
            await User.findByIdAndUpdate(studentId,{
                $pull:{courses:courseId}
            })
        }

        // remove section and sub-section
        const sections = course.courseContent;

        for(const sectionId of sections){
            const section = await Section.findById(sectionId);
            if(section){
                const subSection = await section.subSection;
                for(const subSectionId of subSection){
                   await SubSection.findByIdAndDelete(subSectionId);
                }
            }
            await Section.findByIdAndDelete(sectionId);
        }
        // remove course
        await Course.findByIdAndDelete(courseId);
        // return response
        return res.status(200).json({
            success:true,
            message:"Course Deleted successfully"
        })
    }
    catch(err){
        console.log('error aa gaya',err)
        return res.status(500).json({
            success:false,
            message:"Error occurred in deleting course",
            error:err
        })
    }
}