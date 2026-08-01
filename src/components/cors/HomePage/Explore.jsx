import React from 'react'
import bghome from '../../../assets/Images/bghome.svg'
import Button from './Button'
import { FaArrowRight } from "react-icons/fa6";
function Explore() {
  return (
    <div className='bg-white min-h-[325px] mt-20 w-[100%] relative'>
        <div className='homepage-bg h-[325px] '></div>
        <div className='absolute top-40 flex gap-4 left-[40%]'>
            <Button active={true} linkto={'/signup'} text={'Explore Full Catalog'} className="flex flex-row"> <FaArrowRight></FaArrowRight> </Button>
            <Button active={false} linkto={'/signup'} text={'Learn More'}></Button>
        </div>
    </div>
  ) 
}

export default Explore