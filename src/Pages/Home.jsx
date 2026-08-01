import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Highlighter from '../components/cors/HomePage/Highlighter';
import Button from '../components/cors/HomePage/Button';
import bannervideo from '../assets/Images/banner.mp4'
import CodeBlock from '../components/cors/HomePage/CodeBlock';
import Explore from '../components/cors/HomePage/Explore';
import Timeline from '../components/cors/HomePage/Timeline';
import LearningLanguage from '../components/cors/HomePage/LearningLanguage';
import ExploreMore from '../components/cors/HomePage/ExploreMore';
import ReviewSlider from '../components/cors/common/ReviewSlider';
import BecomeInstructor from '../components/cors/HomePage/BecomeInstructor';
import Footer from '../components/cors/common/Footer';
function Home() {
  return (
    <div>
        {/* Section 1 */}
        <div className='w-11/12 max-w-maxContent text-white mx-auto flex flex-col  items-start md:items-center '>
            <div className='mt-[10%] bg-richblack-200 px-4 py-1 rounded-2xl '>
                <div className='flex flex-row items-center gap-2'>
                    <Link to='/signup'>Become an Instructor</Link>
                    <Link to='/signup'><FaArrowRight/></Link>
                </div>
            </div>

            <div className='text-2xl font-bold mt-10'>
                <p>Empower Your Future with<Highlighter text={'Coding Skills'}></Highlighter></p>
            </div>

            <div className='w-[80%] mt-6 text-richblack-300 text-sm text-start md:text-center'>
                <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
                
            </div>

            <div className='flex flex-row gap-6 mt-10 justify-center mx-auto'>
                <Button text={"Learn More"} linkto={"/signup"} active={true}></Button>
                <Button text={"Book Demo"} linkto={"/signup"} active={false}></Button>
            </div>
            <div className='w-full md:w-[60%] mt-20  bg-white relative'>
                <video src={bannervideo} type='video/mp4' autoPlay muted
                 className='relative w-full h-full object-cover  z-10'
                ></video>
                <div className='absolute bg-blue-100 left-[15%] -top-4  z-0 w-[70%] h-full blur-3xl opacity-60'></div>
                <div className='absolute bg-white -right-4 top-4  z-0 w-[95%] h-full '></div>
                
            </div>
            <div className='w-[100%] mt-20'>
                <CodeBlock position={`md:flex-col  flex-col lg:flex-row`}
                className="max-h-52 bg-caribbeangreen-50"
                title={
                    <div>
                        Unlock your <Highlighter text={"coding potential"} /> <br></br> with our online courses.
                    </div>
                }
                description={<div>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</div>}
                btn1={
                    {
                        btntext:"Try it yourself",
                        linkto:"/signup",
                        active:true
                    }
                }
                btn2={
                    {
                        btntext:"Learn More",
                        linkto:"/signup",
                        active:false
                    }
                }
                codeblock={
                    `<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`
                }
                codeColor={"text-pink-25"}
                gradientcolor={"bg-brown-500"}
                ></CodeBlock>
            </div>


            <div className='w-[100%] '>
                <CodeBlock position={`md:flex-col flex-col lg:flex-row-reverse`}
                title={
                    <div>
                        Unlock your <Highlighter text={"coding potential"} /> <br></br> with our online courses.
                    </div>
                }
                description={<div>Our courses are designed and taught by industry experts who  have years of experience in coding and are passionate about  sharing their knowledge with you.</div>}
                btn1={
                    {
                        btntext:"Try it yourself",
                        linkto:"/signup",
                        active:true
                    }
                }
                btn2={
                    {
                        btntext:"Learn More",
                        linkto:"/signup",
                        active:false
                    }
                }
                codeblock={
                    `<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`
                }
                codeColor={"text-pink-25"}
                gradientcolor={"bg-blue-500"}
                ></CodeBlock>
            </div>
            <div className='relative w-full'>
                <ExploreMore></ExploreMore>
            </div>

        </div>
        <div className='bg-pure-greys-5 flex flex-col justify-center items-center'>

            <Explore></Explore>
            <Timeline></Timeline>
            <LearningLanguage></LearningLanguage>
        </div>
        <div>
            <BecomeInstructor></BecomeInstructor>
            <ReviewSlider></ReviewSlider>
        </div>
        <div>
            <Footer></Footer>
        </div>
    </div>
  )
}

export default Home