const SubSection = require('../models/subSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/ImageUploader')
const cloudinary = require('cloudinary').v2;
const Course = require('../models/course')
require("dotenv").config();
exports.createSubSection = async(req,res)=>{
    try{
        const {sectionId,title,description} = req.body;
        const video = req.files.videoFile;

        // validate
        if(!sectionId || !title || !description || !video){
            return res.status(401).json({
                success:false,
                message:"All details are mandatory"
            })
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        // const create subsection

        const subSectionDetails = await SubSection.create({
            title,
            description,
            timeDuration:uploadDetails.duration,
            videoUrl:uploadDetails.secure_url,
            publicId:uploadDetails.public_id
        })

        // update section schema with subsection id

        const sectionUpdate = await Section.findByIdAndUpdate(
                                                                sectionId,
                                                                {
                                                                    $push:{subSection:subSectionDetails._id}
                                                                },
                                                                {new:true}
                                                            ).populate({path:"subSection"}).exec();

        // return response
        const updatedCourseDetail = await Course.findOne({
                                                                    courseContent:sectionId
                                                                },
                                                            ).populate({
                                                                path:"courseContent",
                                                                populate:{
                                                                    path:"subSection"
                                                                }
                                                            })
        return res.status(200).json({
            success:true,
            data:updatedCourseDetail,
            message:"SubSection created successfully"
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred in creating subsection",
            error:err.message
        })
    }
}


exports.updateSubSection = async(req,res)=>{
    try{
        // fetch all details
        const {subSectionId,title,description,timeDuration} = req.body;
        const video = req.files?.videoFile;

        if(!subSectionId ){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }
        const subSectionDetails = await SubSection.findById(subSectionId);
        if(!subSectionDetails){
            return res.status(404).json({
                success:false,
                message:"Invalid Subsection-ID"
            })
        }
        let updateddata ={
            title,
            description,
            timeDuration
        }

        if(video){
            if(subSectionDetails.publicId){
                await cloudinary.uploader.destroy(subSectionDetails.publicId,{resource_type:'video'})
            }
            const videodetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
            updateddata.videoUrl=videodetails.secure_url,
            updateddata.publicId=videodetails.public_id,
            updateddata.timeDuration=videodetails.duration
        }

        const subSectionUpdatedDetails = await SubSection.findByIdAndUpdate(subSectionId,updateddata,{new:true});


        const section = await Section.findOne({subSection:subSectionId});

        if(!section){
            return res.status(404).json({
                success:false,
                message:"Unable to find section"
            })
        }
        const updatedCourseDetail = await Course.findOne({
                                                            courseContent:section._id
                                                        }).populate({
                                                            path:"courseContent",
                                                            populate:{
                                                                path:'subSection'
                                                            }
                                                        })

        return res.status(200).json({
            success:true,
            message:"SubSection updated successfully",
            data:updatedCourseDetail
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occured in updating subsection , try again...",
            error:err.message
        })
    }
}


exports.deleteSubSection = async(req,res)=>{
    try{
        const {subSectionId} = req.body;

        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }

        await SubSection.findByIdAndDelete(subSectionId);

        // delete subsection id from section schema
        const section = await Section.findOne({subSection:subSectionId});
        if(!section){
            return res.status(400).json({
                success:false,
                message:"Unable to find Section for this Subsection"
            })
        }

        const sectionID = section._id;

        await Section.findByIdAndDelete(sectionID);
        
        return res.status(200).json({
            success:false,
            message:"Subsection deleted successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred in deleting Subsection, try again..."
        })
    }
}