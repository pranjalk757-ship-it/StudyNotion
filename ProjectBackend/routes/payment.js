const express = require('express');
const router = express.Router();

/************ Import from controllers */

const {capturePayment, verifyPayment,sendPaymentSuccessfullEmail} = require('../controllers/Payments');

const {auth,isStudent,isInstructor,isAdmin} = require('../middleware/auth');

router.post('/capturePayment',auth,isStudent,capturePayment);
router.post('/verifyPayment',auth,isStudent,verifyPayment);
router.post('/sendPaymentSuccessfullEmail',auth,isStudent,sendPaymentSuccessfullEmail)

module.exports = router;