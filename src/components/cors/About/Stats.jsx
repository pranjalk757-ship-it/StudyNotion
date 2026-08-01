import React from 'react'

function Stats() {
    const statsData = [
        {
            data:'5K',
            description:"Active Students"
        },
        {
            data:'10+',
            description:"Mentors"
        },
        {
            data:'200+',
            description:"Courses"
        },
        {
            data:'50+',
            description:"Awards"
        },
    ]
  return (
    <div className='bg-richblack-800 mt-[10rem]'>
        <div className='flex flex-row justify-between  w-[60%] mx-auto lg:h-52 items-center '>
            {
                statsData.map((stat,index)=>(
                    <div key={index} className='felx flex-col gap-2 text-center'>
                        <h2 className='text-2xl font-bold text-richblack-5'>{stat.data}</h2>
                        <p className='text-sm text-richblack-400'>{stat.description}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Stats