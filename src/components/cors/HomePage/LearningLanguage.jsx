import React from 'react'
import Highlighter from './Highlighter'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import Button from './Button'
function LearningLanguage() {
  return (
    <div className='flex flex-col justify-center items-center mt-28 mb-20'>
        <h2 className='text-3xl font-semibold'>Your swiss knife for <Highlighter text={"learning any language"} color={`bg-gradient-to-r from-blue-200 to-caribbeangreen-200 bg-clip-text text-transparent `}></Highlighter></h2>

        <p className='w-[50%] text-center mt-4 text-sm'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>

        <div className='flex flex-row mt-10 relative mb-20'>
            <div className='absolute -translate-x-80'>
                <img src={know_your_progress}></img>
            </div>
            <div className='absolute -top-10'>
                <img src={compare_with_others}></img>
            </div>
            <div className='translate-x-80  -mt-10'>
                <img src={plan_your_lessons}></img>
            </div>
        </div>

        <Button active={true} linkto={'/signup'} text={'Learn More'}></Button>
    </div>
  )
}

export default LearningLanguage