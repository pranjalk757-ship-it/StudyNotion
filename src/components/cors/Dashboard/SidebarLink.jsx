import React from 'react'
import * as Icons from 'react-icons/vsc'
import { Link, matchPath, useLocation } from 'react-router-dom';
function SidebarLink({link,path,iconName}) {
    const Icon = Icons[iconName];
    const location = useLocation();
    const matchroute = (route)=>{
        if(!route){
            return false;
        }
        return matchPath({path:route},location.pathname)
    }
  return (
    <Link to={path} >
        
        
        <div
         className={` h-10 relative
            ${matchroute(path) ? 'bg-yellow-800 text-yellow-25' : 'bg-richblack-800 text-richblack-5 text-sm'}  flex flex-row items-center`}
            >
            {  
                matchroute(path) &&
                <span
                    className='border-l-2 border-yellow-25 w-2 h-10 absolute '
                ></span>
                
            }
            <div className='flex flex-row items-center pl-4 gap-2'>
                {
                    Icon &&
                    <Icon className='text-lg'></Icon>
                }
                <span to={path} className='text-sm'>
                    {link.name}
                </span>
            </div>
            
        </div>
    </Link>
  )
}

export default SidebarLink