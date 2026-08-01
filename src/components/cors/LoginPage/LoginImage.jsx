import React from 'react'
import frame from '../../../assets/Images/frame.png'
function LoginImage({image}) {
  return (
    <div  className='relative '>
        <div className='w-[85%] relative z-50'>
            <img src={image} alt="" className='relative'/>
        </div>
        <div className=' absolute top-6 left-8 w-[85%] '>
            <img src={frame}  alt="" className=''/>
        </div>
    </div>
  )
}

export default LoginImage