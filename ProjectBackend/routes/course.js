const express = require("express");
const router = express.Router();

// importing all the controllers

const {createCourse,getAllCourse,getCourseDetails,getInstructorAllCourses,deleteCourse,editCourseDetails,getFullCourseDetails} = require('../controllers/Course');

const {createCategory,showAllCategory,CategoryPageDetails} = require('../controllers/Category');

const {createSection,updateSection,deleteSection} = require('../controllers/Section');

const {createSubSection,updateSubSection,deleteSubSection} = require('../controllers/SubSection');

const {createRatingAndReviews,getAverageRating,getAllRating} = require('../controllers/ratingAndReviews');

const {auth,isStudent,isAdmin,isInstructor} = require('../middleware/auth');

const {updateCourseProgress} = require('../controllers/courseProgress')



//************************************************** COURSES ROUTES ******************************************/

// course can be created only by instructor
router.post('/createCourse',auth,isInstructor,createCourse);

// add a section to course
router.post('/createSection',auth,isInstructor,createSection);

// update a section of course
router.post('/updateSection',auth,isInstructor,updateSection);

// delete a section to course
router.post('/deleteSection',auth,isInstructor,deleteSection);


// add a subsection to section
router.post('/createSubSection',auth,isInstructor,createSubSection);

// update a subsection of section
router.post('/updateSubSection',auth,isInstructor,updateSubSection);

// delete a subsection to section
router.post('/deleteSubSection',auth,isInstructor,deleteSubSection);

// get all courses
router.get('/getAllCourses',getAllCourse);

// get course details
router.post('/getCourseDetails',getCourseDetails);

// get Full coiurse Details
router.post('/getFullCourseDetails',auth,isStudent,getFullCourseDetails)
// get all courses of a instructor

router.get('/showInstructorCourses',auth,getInstructorAllCourses);

// delete a course
router.delete('/deleteCourse',deleteCourse);

// edit a course details

router.post('/editCourse',editCourseDetails)
/*************************************************** CATEGORY ROUTES ONLY FOR ADMIN ****************************/

// create category
router.post('/createCategory',auth,isAdmin,createCategory);

// show all  category 
router.get('/showAllCategories',showAllCategory);


// show  category page details
router.post('/getCategoryPageDetails',CategoryPageDetails);

// update course progress
router.post('/updateCourseProgress',auth,isStudent,updateCourseProgress)

/*************************************************** rating and reviews *************************************** */

router.post('/createRating',auth,isStudent,createRatingAndReviews);
router.get('/getAverageRating',getAverageRating);
router.get('/getReviews',getAllRating)


module.exports = router;