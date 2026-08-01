const Category = require('../models/Category');
const Course = require('../models/course');


exports.createCategory = async(req,res)=>{
    try{
        const {name,description} = req.body;
        // validate
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        // create entry in database

        const categoryDetails = await Category.create({
            categoryName:name,
            categoryDescription:description
        })

        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error occurred in creating Category"
        })
    }
}


exports.showAllCategory = async(req,res)=>{
    try{
        const categorydetails = await Category.find({},{categoryName:true,categoryDescription:true});

        return res.status(200).json({
            success:true,
            categorydetails,
            message:"All Category are fetched successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error occurred in show all Category"
        })
    }
}



exports.CategoryPageDetails = async(req,res)=>{
    try{
        const {categoryId} = req.body;

        const similarCourses = await Category.findById({_id:categoryId}).populate(
            {
                path:'courses',
                populate:{
                    path:'instructor'
                }
            }
        ).exec();

        if(!similarCourses){
            return res.status(404).json({
                success:false,
                message:"No data found of similar category"
            })
        }

        // different category courses

        const differentCategories = await Category.find(
                                                        {_id:{$ne :categoryId}}
                                                    ).populate(
                                                       { 
                                                        path:"courses",
                                                        populate:{
                                                            path:'instructor'
                                                        }
                                                       } 
                                                    ).exec();

        
        const differentCourses = differentCategories.flatMap(
            (category)=>category.courses
        )
        if(differentCourses.length === 0){
            return res.status(404).json({
                success:false,
                message:"No data found of different courses"
            })
        }

        // top selling courses

        const topselling = await Course.find({})
                                            .populate({
                                            path:'instructor'
                                        })
                                        .sort({studentEnrolled: -1})
                                        .limit(4);

        if(topselling.length === 0){
            return res.status(404).json({
                success:false,
                message:"No data found for top selling courses"
            })
        }

        return res.status(200).json({
            success:true,
            message:"All courses related to category are fetched successfully",
            data:{
                similarCourses,
                differentCourses,
                topselling
            }
        })
    }
    catch(err){
        console.log("error",err);
        return res.status(500).json({
            success:false,
            message:"Error occurred in fetching category details"
        })
    }
}