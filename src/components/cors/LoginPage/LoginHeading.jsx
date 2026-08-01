import React from 'react'

function LoginHeading({title,description,accountType,setAccountType}) {
    function setAccountHandler(element){
        setAccountType(element);
    }
  return (
    <div className='w-[80%]'>
        <div className='text-3xl font-semibold'>
            <h1>{title}</h1>
        </div>
        <div className='text-sm mt-4 text-richblack-200'>
            <p>{description} </p>
        </div>
        <div className='flex flex-row items-center rounded-full py-1 mt-10 bg-richblack-800 w-fit px-2 gap-2 text-xs shadow-sm shadow-richblack-300'>
            <div onClick={()=>setAccountHandler('Student')} 
                  className={` px-2 py-1 rounded-full hover:transition-all duration-200 cursor-pointer ${accountType === 'Student' ? "bg-richblack-900":" text-richblack-100"}`}    
            >Student</div>
            
            
            <div onClick={()=>setAccountHandler('Instructors')} 
                  className={`px-2 rounded-full py-1 hover:transition-all duration-200 cursor-pointer ${accountType === 'Instructors' ? "bg-richblack-900":"text-richblack-100"}`}    
            >Instructors</div>
            
        </div>
    </div>
  )
}

export default LoginHeading