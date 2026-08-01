import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Navbar from './components/cors/common/Navbar';
import ResetYourPassword from './Pages/ResetYourPassword';
import UpdatePassword from './Pages/UpdatePassword';
import Aboutus from './Pages/Aboutus';
import ContactUs from './Pages/ContactUs';
import OtpVerify from './Pages/OtpVerify';
import Dashboard from './Pages/Dashboard';
import MyProfile from './components/cors/Dashboard/MyProfile';
import Settings from './components/cors/Dashboard/Setting/Settings';
import PrivateRoute from './components/cors/auth/PrivateRoute';
import EnrolledCourses from './components/cors/Dashboard/EnrolledCourses';
import Cart from './components/cors/Dashboard/cart';
import AddCourse from './components/cors/Dashboard/AddCourse/index';
import MyCourses from './components/cors/Dashboard/MyCourses/MyCourses';
import Catalog from './Pages/Catalog';
import CourseDetails from './Pages/CourseDetails';
import StudentView from './Pages/StudentView';
import StudentViewVideo from './components/cors/StudentView/StudentViewVideo';
import { ACCOUNT_TYPE } from './utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import InstructorDashboard from './components/cors/Dashboard/InstructorDashboard/InstructorDashboard';
import PurchaseHistory from './components/cors/Dashboard/PurchaseHistory';
import { useEffect } from 'react';

function App() {
  const {user} = useSelector((state)=>state.profile)
  
  return (
    <div className="w-screen min-h-screen bg-richblack-900">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>} ></Route>
        <Route path='/signup' element={<Signup></Signup>} ></Route>
        <Route path='/otp-verification' element={<OtpVerify></OtpVerify>}></Route>
        <Route path='/reset-password' element={<ResetYourPassword></ResetYourPassword>} ></Route>
        <Route path='/update-password/:id' element={<UpdatePassword></UpdatePassword>}></Route>
        <Route path='/about' element={<Aboutus></Aboutus>}></Route>
        <Route path='/contact' element={<ContactUs></ContactUs>}></Route>
        <Route path='/category/:categoryName' element={<Catalog></Catalog>}></Route>
        <Route path='/course/:courseId' element={<CourseDetails></CourseDetails>}></Route>
        <Route
          element={
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          }
        >
          <Route path='/dashboard/my-profile' element={<MyProfile></MyProfile>}></Route>
          <Route path='/dashboard/setting' element={<Settings></Settings>}></Route>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses></EnrolledCourses>}></Route>
                <Route path='/dashboard/wishlist' element={<Cart></Cart>}></Route>
                <Route path='/dashboard/purchase-history' element={<PurchaseHistory></PurchaseHistory>}></Route>
              </>
            )
          }
          
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
            (
              <>
                <Route path='/dashboard/add-course' element={<AddCourse></AddCourse>}></Route>
                <Route path='/dashboard/my-courses' element={<MyCourses></MyCourses>}></Route>
                <Route path='/dashboard/instructor' element={<InstructorDashboard></InstructorDashboard>}></Route>
              </>
            )
          }
        </Route>

        <Route
          element={
            <PrivateRoute>
              <StudentView></StudentView>
            </PrivateRoute>
          }
        >
          <Route path='/view-course/:courseId/section/:sectionId/sub-section/:subSectionId' element={<StudentViewVideo></StudentViewVideo>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
