import React from 'react'
import Highlighter from '../components/cors/HomePage/Highlighter'
import Quote from '../components/cors/About/Quote'
import FoundingStory from '../components/cors/About/FoundingStory'
import aboutus1 from '../assets/Images/aboutus1.webp'
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'
import Stats from '../components/cors/About/Stats'
import LearningAnyone from '../components/cors/About/LearningAnyone'
import ContactusForm from '../components/cors/contactus/ContactusForm'
import Footer from '../components/cors/common/Footer'
import ReviewSlider from '../components/cors/common/ReviewSlider'
function Aboutus() {
  return (
    <div>
        {/* section 1 */}
        <section className='bg-richblack-800 h-[70vh] flex flex-col items-center justify-center relative'>
            <div className='w-[50%] flex flex-col items-center mt-20 text-richblack-300' >
                <p className='text-xs '>About us</p>
                <h2 className='text-3xl text-center w-[90%] mt-10 text-white'>
                    Driving Innovation in Online Education for a 
                    <Highlighter text={'Brighter Future'} color={' text-caribbeangreen-50'}></Highlighter>
                </h2>
                <p className='text-xs mt-6 text-center w-[90%]'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
            </div>
            <div className='w-[15rem] h-52 bg-gradient-to-r  from-[#E65C00] to-[#F9D423] mt-10 blur-[55px]'></div>
        <div className='flex flex-row gap-4  absolute  top-[22rem] w-fit h-fit'>
            <img src={aboutus1}   alt="" />
            <img src={aboutus2} alt="" />
            <img src={aboutus3} alt="" />
        </div>
        </section>
        {/* section 2 */}
        <section>
            <Quote></Quote>
        </section>

        {/* section 3 */}
        <div className='bg-richblack-700 h-[1px] mt-20'></div>
        <FoundingStory></FoundingStory>

        <Stats></Stats>

        <LearningAnyone></LearningAnyone>


        {/* contact us form */}
        <div className='flex flex-col items-center mt-40'>
            <h2 className='text-3xl text-white'>Get in Touch</h2>
            <p className='text-xs text-richblack-300 mt-5 '>We’d love to here for you, Please fill out this form.</p>
        </div>
        <div className=''>
            <ContactusForm></ContactusForm>
        </div>
        <div>
            <ReviewSlider></ReviewSlider>
        </div>
        <div>
            <Footer></Footer>
        </div>
    </div>
  )
}

export default Aboutus