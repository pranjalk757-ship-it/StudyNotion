import React from 'react'
import Highlighter from './Highlighter'
import Button from './Button'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import Timelineimage from '../../../assets/Images/TimelineImage.png'
function Timeline() {

    const timelinedata=[
        {
            image:Logo1,
            text1:"Leadership",
            text2:"Fully committed to the success company"
        },
        {
            image:Logo2,
            text1:"Responsibility",
            text2:"Students will always be our top priority"
        },
        {
            image:Logo3,
            text1:"Flexibility",
            text2:"The ability to switch is an important skills"
        },
        {
            image:Logo4,
            text1:"Solve the problem",
            text2:"Code your way to a solution"
        }
    ]

  return (
    <div className='w-11/12 flex flex-col justify-center mt-20 mb-10 '>
        {/* part 1 */}
        <div className='flex flex-row h-28 gap-10 '>
            <div className='w-[50%] text-3xl pl-28 '>
                <p className='w-[80%]'>Get the skills you need for a <Highlighter text={'job that is in demand'}
                 color={`bg-gradient-to-r from-blue-200 to-caribbeangreen-200 bg-clip-text text-transparent `}
                ></Highlighter></p>
            </div>
            <div className='w-[50%] flex flex-col justify-between text-sm'>
                <p className='w-[70%]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                <div className='w-fit'>

                <Button text={'Learn More'} linkto='/signup' active={true} className=''></Button>
                </div>
            </div>
        </div>

        {/* part 2 */}
        <div className='mt-20 flex flex-row justify-center  gap-10 items-center' >
            {/* left part */}
            <div className='w-[40%]'>
                {
                    timelinedata.map((element,index)=>{
                        return (
                            <div className='flex flex-row gap-8 mt-10 pl-10' key={index}>
                                <div className=' relative'>
                                    <div className='w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center mt-1'>
                                        <div className='w-[15px]'> 
                                            <img src={element.image}></img>
                                    </div>
                                    {
                                        index < 3 &&
                                        <div className='h-8 w-[1px] absolute -bottom-9 border-l-2 border-caribbeangreen-300 border-dashed'></div>
                                    }
                                </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-sm'>
                                        {element.text1}
                                    </div>
                                    <div className='text-xs'>
                                        {element.text2}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* right part */}
            
                <div className='relative'>
                    <div className='w-full pr-10 relative  z-0'>
                        <div className='w-[100px] h-[100px]  bg-blue-100 absolute left-0 top-52 blur-2xl'></div>
                        <div className='w-[100px] h-[100px]  bg-blue-100 absolute right-2 top-52 blur-2xl'></div>
                        <div className='absolute bg-white w-[70%] right-[20px]  h-full top-4 '></div>
                        <div className='w-[100%] relative'>
                            <img className='z-50 ' src={Timelineimage}></img>
                        </div>
                    </div>
                    <div className='w-[80%] h-20 bg-caribbeangreen-800 text-caribbeangreen-200 left-16 -mt-10 absolute flex flex-row justify-center gap-20 items-center'>
                        <div className='flex flex-row gap-4 items-center'>
                            <div><p className='text-white font-bold text-3xl'>10</p></div>
                            <div className='text-xs'>
                                <p>YEARS</p>
                                <p>EXPERIENCES</p>
                            </div>
                        </div>
                        <div className='border-caribbeangreen-300  border-l-2 h-10'></div>
                        <div className='flex flex-row gap-4 items-center'>
                            <div><p className='text-white font-bold text-3xl'>250</p></div>
                            <div className='text-xs'>
                                <p>TYPES OF</p>
                                <p>COURSES</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Timeline