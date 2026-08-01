const express = require('express');
const router = express.Router();

/****************************** IMPORTING ALL THE CONTROLLER FUNCTIONS */


const {signUp,login,sendOtp,changePassword} = require('../controllers/Auth');

const {resetPasswordToken,resetPassword} = require('../controllers/ResetPassword');

const {auth} = require('../middleware/auth');


/******************************* AUTHENTICATION ROUTES ***************/

// ROUTE for login
router.post('/login',login);

// ROUTE for signUp
router.post('/signup',signUp);

// ROUTE for sendOtp
router.post('/sendotp',sendOtp);


// ROUTE for changing password
router.post('/changePassword',auth,changePassword);



/********************************* RESET PASSWORD */

// route for generating reset password token

router.post('/reset-password-token',resetPasswordToken);

// route for reset password

router.post('/reset-password',resetPassword)

module.exports = router;