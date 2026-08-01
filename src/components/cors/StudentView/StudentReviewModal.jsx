import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { create_rating_review } from '../../../services/operations/viewCourseDetails';
import ReactStars from "react-rating-stars-component";
import { MdOutlineStars } from "react-icons/md";
function StudentReviewModal({setReviewModal}) {

  const {user} = useSelector((state)=>state.profile);
  const {courseEntireData} = useSelector((state)=>state.viewCourse);
  const {token} = useSelector((state)=>state.auth);
  const {register,handleSubmit,formState:{errors},setValue} = useForm();
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  async function saveHandler(data){
    console.log("rating stars",ReactStars)
    setLoading(true);
    try{
      const hello ={
          rating:data.courseRating,
          review:data.review,
          courseId:courseEntireData?._id
        }
        console.log("course",courseEntireData)
        console.log('data',hello)
      await dispatch(create_rating_review({data:hello
        ,
        token
      }))

      setReviewModal(false);
    }
    catch(err){
      console.log("Error occurred in creating review",err)
    }
    setLoading(false);
  }

  

  function ratingChanged(newRating){
    setValue('courseRating',newRating)
  }
  return (
    <div className='fixed inset-0 z-[9999] overflow-auto !mt-0 grid place-items-center bg-white bg-opacity-10 
    backdrop-blur-sm '>
      <div className='bg-richblack-800 w-[30%] h-[45%]'>
        <div className='bg-richblack-700 py-2 pl-4 font-bold'>
          <h2 className='text-white '>ADD REVIEW</h2>
        </div>
        <div className='h-[1px] bg-white mb-2'></div>
        <div>
          <div>
            <div className='flex flex-row justify-center mt-8 gap-2 items-center text-white '>
              <div className='w-14 h-14 rounded-full'>
                <img src={user?.image} className='rounded-full'></img>
              </div>
              <div>
                <p className='text-lg'>{user?.firstName} {user?.lastName}</p>
                <p className='text-sm'>Posting Publicly</p>
              </div>
            </div>
              <div >
                <form onSubmit={handleSubmit(saveHandler)}>
                  <div className=' flex  justify-center mt-4'>
                    <ReactStars 
                          count={5}
                          onChange={ratingChanged}
                          size={20}
                          edit={true}
                          activeColor="#ffd700"
                          emptyIcon={<MdOutlineStars  className='text-white'/>}
                          filledIcon={<MdOutlineStars />}
                          halfIcon={<MdOutlineStars />}
                      />
                  </div>
                  <div className='flex flex-col px-4'>
                    <label htmlFor='review' className='text-white mt-4 text-sm '>Add Your Experience</label>
                    <textarea
                      name='review'
                      id='review'
                      placeholder='Share Detail of your experience in this course'
                      {...register('review',{required:true})}
                      className='bg-richblack-600 rounded-md text-sm max-h-20 min-h-20 p-2 mt-2 text-white'
                    ></textarea>
                    {
                      errors.review &&
                      <p>Review is mandatory</p>
                    }
                  </div>
                  <div className='flex flex-row justify-end mt-6 mr-6 gap-2'>
                    <button
                    className='bg-richblack-600 px-4 py-1 rounded-md text-white font-bold'
                      onClick={()=>setReviewModal(false)}
                    >
                      Cancel
                    </button>

                    <button
                      className='bg-yellow-100 px-4 py-1 rounded-md font-bold'
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentReviewModal