import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetch_all_reviews } from '../../../services/operations/viewCourseDetails';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import '../../../index.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function ReviewSlider() {
    const [reviewData,setReviewData] = useState(null);
    const dispatch = useDispatch();

    async function fetchAllReviews(){
        const result = await dispatch(fetch_all_reviews());
        if(result){
            setReviewData(result);
        }
    }
    useEffect(()=>{
        fetchAllReviews();
        console.log("reviewData",reviewData)
    },[])
  return (
    <div className='text-white mt-10 w-11/12 mx-auto flex flex-col items-center '>
        <h1 className='font-bold text-3xl mb-10'>Reviews from other learners</h1>
        <div className='w-full'>
            <Swiper
                    key={'different'}
                    spaceBetween={10}
                    centeredSlides={false}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    slidesPerView={4}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper h-[20rem]"
                  >
                    {
                        reviewData?.map((review)=>(
                            <SwiperSlide key={review._id} className='bg-richblack-800 rounded-md max-h-52'>
                                <div className='flex flex-row justify-start pl-4 items-center mt-4 gap-2'>
                                    <div>
                                        <img src={review?.user?.image} className='w-14 h-14 rounded-full'></img>
                                    </div>
                                    <div>
                                        <div className='text-white text-lg'>
                                            {review?.user?.firstName}
                                        </div>
                                        <div className='text-richblack-100 text-xs'>
                                            {review?.user?.email}
                                        </div>
                                    </div>
                                </div>
                                    <div className='text-white text-lg font-semibold p-4'>
                                        {review?.review}
                                    </div>
                            </SwiperSlide>
                        ))

                    }
                  </Swiper>
        </div>
    </div>
  )
}

export default ReviewSlider