import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineStarBorder } from "react-icons/md";
import ReactStars from 'react-rating-stars-component'
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';
function RenderCourses() {
    const {cart} = useSelector((state)=>state.cart);
    console.log("cart",cart)
    const dispatch = useDispatch();
    const removeFromCartHandler = (course)=>{
        console.log("Removing course",course)
        dispatch(removeFromCart(course))
    }
  return (
    <div>
        {
            !cart.length ?
            <div>
            </div>
            :
            <div className='text-white'>
                {
                    cart.map((course,index)=>(
                        <div key={index} >
                            <div className='flex flex-row gap-5  mt-5 items-start  '>
                                <div className='w-[10rem] rounded-md overflow-hidden'>
                                    <img src={course?.thumbnail} alt="" className='h-[7rem]' />
                                </div>
                                <div className='flex flex-col gap-2 ml-4'>
                                    <p className='text-white font-semibold'>{course?.courseName} </p>
                                    <p className='text-yellow-400 text-sm font-bold'>{course?.category?.[0].categoryName}</p>
                                    <div className='flex flex-row items-center gap-2'>
                                        <p>4.5</p>
                                        <ReactStars
                                            size={20}
                                            count={5}
                                            edit={false}
                                            activeColor='ffd700'
                                            emptyIcon={<MdOutlineStarBorder/>}
                                            filledIcon={<MdOutlineStarBorder/>}
                                            halfIcon= {<MdOutlineStarBorder/>}
                                        ></ReactStars>
                                        <span>
                                            {course?.ratingAndReviews?.length} Rating
                                        </span>
                                    </div>
                                    <p>Total Courses Lessons Beginners</p>
                                </div>
                                <div className='ml-20'>
                                    <div onClick={()=>removeFromCartHandler(course)} className='flex flex-row items-center gap-2 bg-richblack-700 border border-richblack-500 px-4 py-2 rounded-md mt-2 text-pink-200 cursor-pointer' >
                                        <RiDeleteBin5Line size={20}></RiDeleteBin5Line> 
                                        <p className='text-sm'>Remove</p>
                                    </div>
                                    <div className='text-2xl text-yellow-50 font-semibold mt-2'>
                                        ₹ {course?.price}
                                    </div>
                                </div>
                            </div>
                            {
                                index < cart?.length-1 &&
                                <div className='w-full bg-richblack-200 h-[1px] mt-4'></div>
                            }
                        </div>
                    ))
                }
            </div>

        }
    </div>
  )
}

export default RenderCourses