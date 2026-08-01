const CourseProgress = require('../models/courseProgress')
const SubSection = require('../models/subSection')
exports.updateCourseProgress = async(req,res)=>{
    try{
        const {courseId,subSectionId} = req.body;
        const userId = req.candidate?.id;
        console.log("BODY:", req.body);
        console.log("CourseId",courseId)
        console.log("subsecId",subSectionId)
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:'Cannot find subSection'
            })
        }


        console.log("UserId:", userId);
console.log("Searching with:", {
    courseId,
    userId
});

        const courseProgress = await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        })

        console.log("UserId:", userId);
console.log("Searching with:", {
    courseId,
    userId
});

        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Unable to find course progress"
            })
        }
        if(courseProgress.completedVideos?.includes(subSectionId)){
            return res.status(400).json({
                success:false,
                message:"lecture is already mark completed"
            })
        }
        else{
            courseProgress.completedVideos.push(subSectionId);
            await courseProgress.save();
        }
        return res.status(200).json({
            success:true,
            message:"Lecture marked as completed"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error occurred in updating course Progress"
        })
    }
}