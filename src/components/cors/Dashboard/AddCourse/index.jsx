import React from 'react'
import RenderStep from './RenderStep'
function AddCourse() {
  return (
    <div className='flex flex-row gap-20 ml-20 mt-20 w-11/12 '>
        <div className='w-[50%]'>
            <RenderStep></RenderStep>
        </div>
        <div className='bg-richblack-800 py-4 pl-4 rounded-md w-[30%] flex flex-col items-start h-fit'>
            <h2 className='text-lg text-white'>⚡Course Upload Tips</h2>
            <ul className='text-xs text-richblack-100 list-disc pl-4 space-y-2 mt-2' >
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>
    </div>
  )
}

export default AddCourse