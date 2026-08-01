import React from 'react'
import { Link } from 'react-router-dom'
function Button({text,linkto,active,children,className}) {
  return (
    <button
    className={`text-sm px-4 py-2 rounded-md  font-bold ${className} 
        ${active?"text-richblack-800 bg-yellow-100 ":"bg-richblack-700 text-white"}`}
    ><Link to={linkto} className='flex flex-row items-center gap-2 justify-center'>{text}{children}</Link>  </button>
  )
}

export default Button