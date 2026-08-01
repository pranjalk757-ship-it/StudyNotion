import React from 'react'
import { Link } from 'react-router-dom'

function CourseCard({courses}) {
  return (
    <div>
        <h1 className='text-white text-3xl mb-8'>Frequently Bought Together</h1>
        <div>
            <div className='grid grid-cols-2 mx-auto place-items-center gap-8'>
                {
                    courses.map((course)=>(
                        <Link to={`/course/${course._id}`} key={course._id} className=' w-full'>
                            <div className='w-full'>
                                <img src={course.thumbnail} className='w-full h-[400px] rounded-md'></img>
                            </div>
                            <div className='text-sm text-white mt-4'>
                                {course.courseDescription}
                            </div>
                            <div className='text-xs text-richblack-100 mt-2'>
                                {course.instructor.firstName} {course.instructor.lastName}
                            </div>
                            <div className='text-white text-lg mt-2'>
                                Rs. {course.price}
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default CourseCard