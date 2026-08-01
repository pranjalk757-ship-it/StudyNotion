const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("Base url y er ",BASE_URL);
export const endpoints = {
    SENDOTP_API: BASE_URL + '/auth/sendotp',
    SIGNUP_API: BASE_URL + '/auth/signup',
    LOGIN_API: BASE_URL + '/auth/login',
    RESETPASSTOKEN_API: BASE_URL + '/auth/reset-password-token',
    RESETPASSWORD_API: BASE_URL + '/auth/reset-password'
}

export const categories = {
    CATEGORIES_API: BASE_URL + '/course/showAllCategories',
    GET_CATEGORIES_PAGE_DETAILS: BASE_URL + '/course/getCategoryPageDetails'
}

export const settings = {
    UPDATE_MY_PROFILE: BASE_URL + '/profile/updateProfile',
    UPDATE_PROFILE_PICTURE: BASE_URL + '/profile/updateDisplayPicture',
    UPDATE_PASSWORD: BASE_URL + '/auth/changePassword',
    DELETE_PROFILE: BASE_URL + '/profile/deleteProfile'
}

export const profile = {
    GET_ENROLLED_COURSES: BASE_URL + '/profile/getEnrolledCourses',
    GET_INSTRUCTOR_STATS: BASE_URL + '/profile/getInstructorStats'
}

export const courseEndPoints = {
    EDIT_COURSE_API: BASE_URL + '/course/editCourse',
    CREATE_COURSE_API: BASE_URL + '/course/createCourse',
    CREATE_SECTION_API: BASE_URL + '/course/createSection',
    EDIT_SECTION_API: BASE_URL + '/course/updateSection',
    DELETE_SECTION_API: BASE_URL + '/course/deleteSection',
    CREATE_SUBSECTION_API: BASE_URL + '/course/createSubSection',
    UPDATE_SUBSECTION_API: BASE_URL + '/course/updateSubSection',
    DELETE_SUBSECTION_API: BASE_URL + '/course/deleteSubSection',
    GET_INSTRUCTOR_COURSES: BASE_URL + '/course/showInstructorCourses',
    DELETE_COURSE_API: BASE_URL + '/course/deleteCourse',
    GET_COURSE_DETAILS: BASE_URL + '/course/getCourseDetails',
    GET_FULL_COURSE_DETAILS: BASE_URL + '/course/getFullCourseDetails',
    UPDATE_COURSE_PROGRESS: BASE_URL + '/course/updateCourseProgress',
    CREATE_RATING_API: BASE_URL + '/course/createRating',
    FETCH_ALL_REVIEWS: BASE_URL + '/course/getReviews'
}

export const paymentEndPoints = {
    CAPTURE_PAYMENT_API: BASE_URL + '/payment/capturePayment',
    VERIFY_PAYMENT_API: BASE_URL + '/payment/verifyPayment',
    SEND_PAYMENT_SUCCESSFULL_EMAIL: BASE_URL + '/payment/sendPaymentSuccessfullEmail'
}