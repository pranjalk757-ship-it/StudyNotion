const express = require('express');
const router = express.Router();

/****************** Import  controllers */

const {updateProfile,deleteProfile,getAllUserDetails,getEnrolledCourses,updateDisplayPicture,getInstructorStats} = require('../controllers/Profile')

const {auth,isStudent, isInstructor} = require('../middleware/auth')
/*****************  Profile Routes  */

router.delete('/deleteProfile',auth,deleteProfile);

router.put('/updateProfile',auth,updateProfile);

router.post('/getUserDetails',auth,getAllUserDetails);

router.put('/updateDisplayPicture',auth,updateDisplayPicture);
router.get('/getEnrolledCourses',auth,isStudent,getEnrolledCourses);
router.get('/getInstructorStats',auth,isInstructor,getInstructorStats)

module.exports = router;