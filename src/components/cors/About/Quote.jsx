import React from 'react'
import Highlighter from '../HomePage/Highlighter'
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

function Quote() {
  return (
    <div className='text-richblack-50 w-11/12 mx-auto  text-3xl  mt-[10rem]'>
        
        <p className='w-[80%] text-center mx-auto '>
            <FaQuoteLeft className='inline align-top text-richblack-500 ' size={20}></FaQuoteLeft>
            {' '}
            <span> 
                We are passionate about revolutionizing the way we learn. Our innovative platform 
                <Highlighter text={'combines technology'} color={'text-caribbeangreen-50'}></Highlighter>,  
                <Highlighter text={'expertise'} color={'bg-gradient-to-r  from-[#FF512F] to-[#F09819] bg-clip-text text-transparent'}></Highlighter>, and community to create an 
                <Highlighter text={'unparalleled educational experience'} color={'bg-gradient-to-r  from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent'}></Highlighter>    
            </span> {' '}
            <FaQuoteRight className='inline align-top text-richblack-500' size={20}></FaQuoteRight>
        </p>
        
    </div>
  )
}

export default Quote