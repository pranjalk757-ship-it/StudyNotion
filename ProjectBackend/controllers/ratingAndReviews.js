const ratingAndReviews = require('../models/ratingAndReviews');
const Course = require('../models/course');
const { default: mongoose } = require('mongoose');


exports.createRatingAndReviews = async(req,res)=>{
    try{
        const userId = req.candidate.id;

        const {rating,review,courseId} = req.body;

        // check if student is enrolled in course or not
        const isenrolled = await Course.findOne({
                                                _id:courseId,
                                                studentEnrolled:{$elemMatch: {$eq :userId}}
                                            })
        if(!isenrolled){
            return res.status(404).json({
                success:false,
                message:"Enrolled students can only give reviews and rating"
            })
        }
        
        // check if already not given rating
        const alreadyReviewed = await ratingAndReviews.findOne({
                                                    course:courseId,
                                                    user:userId
                                                })

        if(alreadyReviewed){
            return res.status(200).json({
                success:false,
                message:"Rating and Review done already"
            })
        }
        // create rating and reviews

        const ratingReview = await ratingAndReviews.create({
                                                    user:userId,
                                                    course:courseId,
                                                    rating:rating,
                                                    review:review
                                                });

        // update course schema

        const courseUpdate = await Course.findByIdAndUpdate(
                                                            {_id:courseId},
                                                            {
                                                                $push:{ratingAndReviews:ratingReview._id}
                                                            },
                                                            {new:true}
                                                        )

        return res.status(200).json({
            success:true,
            message:"Rating and Reviews done successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error occurred while rating and review"
        })
    }
}



exports.getAverageRating = async(req,res)=>{
    try{
        const {courseId} = req.body;

        const result = await ratingAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg : "$rating"},
                }
            }
        ])

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }

        return res.status(200).json({
            success:true,
            message:"Average rating is 0, No rating till Now",
            averageRating:0,
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occured in getting average rating"
        })
    }
}


exports.getAllRating = async(req,res)=>{
    try{
        
        const allReviews = await ratingAndReviews.find({})
                                                        .sort({rating:"desc"})
                                                        .populate({
                                                        path:"user",
                                                        select:"firstName lastName email image"
                                                        })
                                                        .populate({
                                                        path:"course",
                                                        select:"courseName "
                                                        })
                                                        .exec();

        return res.status(200).json({
            success:true,
            message:"All reviews are fetched successfully",
            data:allReviews
        })                                                        
    }
    catch(err){
        console.log("error",err)
        return res.status(500).json({
            success:false,
            messgae:"Error occurred in fetching all ratings"
        })
    }
}