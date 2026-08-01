import React from 'react'
import { useSelector } from 'react-redux'
import RenderCourses from './RenderCourses'
import RenderTotalPrice from './RenderTotalPrice'

function Cart() {
    const {totalItems,total} = useSelector((state)=>state.cart)
  return (
    <div>
        <h1 className='text-4xl text-white font-bold'>My Wishlist</h1>
        {
            totalItems > 0 ?
            <div className='mt-10 ml-[10%]'>
                 <p className='text-richblack-300 mb-2'>{totalItems} Courses in wishlist</p>
                 <div className='h-[1px] w-[90%] bg-richblack-500 mb-5'></div>
                 <div className='flex flex-row w-[90%] justify-between gap-8'>
                  <div className='w-[80%] '>
                    <RenderCourses></RenderCourses>
                  </div>
                  <div className='w-[25%]'>
                    <RenderTotalPrice></RenderTotalPrice>
                  </div>
                 </div>
            </div> 
            :
            <div className='text-white mt-4'>
                <p>No item present in cart</p>
            </div>
        }
        
    </div>
  )
}

export default Cart