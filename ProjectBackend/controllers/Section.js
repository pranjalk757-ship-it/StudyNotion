const Section = require('../models/Section')
const Course = require('../models/course');
const subSection = require('../models/subSection');


exports.createSection = async (req,res)=>{
    try{
        // fetch data
        const {sectionName,courseId} = req.body;
        console.log("Section Name",sectionName,courseId)
        //validate
        if(!sectionName || !courseId){
            return res.status(401).json({
                success:false,
                message:"Missing Properties"
            })
        }

        // create section
        const sectionDetail = await Section.create({sectionName});

        // update section in course schema
        const courseDetail = await Course.findByIdAndUpdate(
                                                            courseId,
                                                            {
                                                                $push:{courseContent:sectionDetail._id}
                                                            },
                                                            {new:true}
                                                            ).populate({
                                                                path:"courseContent",
                                                                populate:{
                                                                    path:"subSection"
                                                                }
                                                            }).exec();
        if(!courseDetail){
            return res.status(404).json({
                success:false,
                message:"course detail not found"
            })
        }

        return res.status(200).json({
            success:true,
            courseDetail,
            message:"Section created successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Failed to create Section ,try again..."
        })
    }
}


exports.updateSection = async(req,res)=>{
    try{
        // fetch data
        const {sectionId,sectionName} = req.body;

        // validate
        if(!sectionId || !sectionName){
            return res.status(402).json({
                success:false,
                message:"Missing Properties"
            })
        }

        // find section and update
        const newsection = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true});

        const updatedCourseDetail = await Course.findOne({
                                                        courseContent:sectionId
                                                    }).populate(
                                                        {
                                                            path:'courseContent',
                                                            populate:{
                                                                path:"subSection"
                                                            }
                                                        }
                                                    );
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data:updatedCourseDetail

        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred in updatig section, try again...",
            error:err.message
        })
    }
}


exports.deleteSection = async(req,res)=>{
    try{
        // we are sending id in params
        const {sectionId,courseId} = req.body;
        if(!sectionId){
            return res.status(402).json({
                success:false,
                message:"Missing Properties"
            })
        }
        // deleting section 
        await Section.findByIdAndDelete(sectionId);

        // deleting section id from course schema
        const course = await Course.findOne({courseContent:sectionId});
        if(!course){
            return res.status(400).json({
                success:false,
                message:"Unable to find Course containing this Section"
            })
        }
        await Course.findByIdAndUpdate(courseId,{
                                                   $pull:{courseContent:sectionId} 
                                                },
                                                {new:true}
                                            )

        // return response
        const updatedCourseDetail = await Course.findById(
                                                        courseId
                                                    ).populate({
                                                        path:"courseContent",
                                                        populate:{
                                                            path:"subSection"
                                                        }
                                                    })

        return res.status(200).json({
            success:true,
            message:"Section deleted Successfully",
            data:updatedCourseDetail
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error occured in deleting section"
        })
    }
}