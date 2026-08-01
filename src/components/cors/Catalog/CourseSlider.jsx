import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import '../../../index.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';



function CourseSlider({courses,sliderId}) {
    console.log("courses ye hai",courses)
  return (
    <div>
      <Swiper
        key={sliderId}
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
                courses.map((course)=>(
                    <SwiperSlide key={course._id} >
                        <Link to={`/course/${course._id}`} className='space-y-1'>
                            <div>
                                <img src={course.thumbnail} className='w-[300px] h-[200px] rounded-md'></img>
                            </div>
                            <div className='text-white text-sm'>
                                {course.courseDescription}
                            </div>
                            <div className='text-richblack-100 text-xs'>
                                {course.instructor.firstName} {course.instructor.lastName}
                            </div>
                            <div className='text-white text-lg font-semibold'>
                                Rs. {course.price}
                            </div>
                        </Link>
                    </SwiperSlide>
                ))
            }
      </Swiper>
    </div>
  )
}

export default CourseSlider