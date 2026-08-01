import React from 'react'
import Highlighter from '../HomePage/Highlighter'
import Button from '../HomePage/Button'


function LearningAnyone() {

    const learningData = [
        {
            order:-1,
            heading:'World-Class Learning for',
            higlightedText:'Anyone, Anywhere',
            description:'Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.',
            btnText:"Learn More",
            btnLink:'/signup'
        },
        {
            order:1,
            heading:"Curriculum Based on Industry Needs",
            description:'Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.'
        },
        {   
            order:2,
            heading:'Our Learning Methods',
            description:'The learning process uses the namely online and offline.'
        },
        {   
            order:3,
            heading:'Certification',
            description:'You will get a certificate that can be used as a certification during job hunting.'
        },
        {   
            order:4,
            heading:'Rating "Auto-grading" ',
            description:'You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.'
        },
        {   
            order:5,
            heading:'Ready to Work ',
            description:'Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.'
        },
    ]

  return (
    <div className='w-11/12 mx-auto px-10'> 
        <div className='grid grid-cols-4 mt-20 px-20'>
            {
                learningData.map((element,index)=>(
                    <div key={index}
                        className={`
                            ${element.order < 0 && "col-span-2 bg-transparent"}   
                            ${element.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"} 
                            ${element.order === 3 && " col-start-2"}
                            lg:h-[15rem]
                        `}
                    >
                        {
                            element.order < 0 ? 
                            <div className='text-white '>
                                <h2 className='text-3xl font-bold'>{element.heading}</h2>
                                <div className='text-3xl font-bold'>
                                    <Highlighter text={element.higlightedText} color={'bg-gradient-to-r  from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent'}></Highlighter>
                                </div>
                                <p className='text-xs text-richblack-400 w-[80%] mt-4 mb-10'>{element.description}</p>
                                <Button text={element.btnText} active={true} linkto={element.btnLink}></Button>
                            </div>
                            :
                            <div className='text-white px-6 pt-10'>
                                <h2 className='text-lg'>{element.heading}</h2>
                                <p className='text-xs text-richblack-300 mt-10 '>{element.description} </p>
                            </div>
                        }
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default LearningAnyone