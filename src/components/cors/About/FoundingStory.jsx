import React from 'react'
import foundingStoryImage from '../../../assets/Images/FoundingStory.png'
import Highlighter from '../HomePage/Highlighter'
function FoundingStory() {
  return (
    <div className='flex flex-col w-11/12 mx-auto mt-[10rem] '>
        {/* top part */}
        <div className='flex flex-row text-richblack-300 px-10 justify-center items-center'>
            {/* left box */}
            <div className='w-[45%] '>
                <h2 className='text-3xl'><Highlighter text={'Our Founding Story '} color={'bg-gradient-to-r  from-[#833AB4]  via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent'}></Highlighter></h2>
                <p className='text-xs mt-8 w-[70%]'>
                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                </p>
                <p className='text-xs mt-6 w-[70%] '> 
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                </p>
            </div>
            {/* right part */}
            <div className='relative'>
                <img src={foundingStoryImage} width={500} className='w-[70%] relative z-50' ></img>
                <div className='w-40 h-32 bg-caribbeangreen-50 absolute -top-1 left-[10%] blur-3xl'></div>
            </div>
        </div>

        {/* Bottom part */}
        <div  className='flex flex-row text-richblack-300 pl-28 justify-center items-center mt-[12rem]'>
            {/* Left box */}
            <div className='w-[45%]'>
                <h2 className='text-3xl'><Highlighter text={'Our Vision'} color={'bg-gradient-to-r  from-[#E65C00]  to-[#F9D423] bg-clip-text text-transparent'}></Highlighter></h2>
                <p className='text-xs w-[70%] mt-8' >
                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                </p>
            </div>

            {/* Right box */}
            <div className='w-[45%]'>
                <h2 className='text-3xl'><Highlighter text={'Our Mission'} color={'text-blue-100'}></Highlighter></h2>
                <p className='text-xs w-[70%] mt-8'>
                    our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                </p>
            </div>
        </div>
    </div>
  )
}

export default FoundingStory