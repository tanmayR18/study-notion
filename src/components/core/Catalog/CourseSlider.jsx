import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'
import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {

  return (
    <>
        {
            Courses?.length > 0 ? (
                <Swiper  
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={200}
                    pagination={true}
                    modules={[Autoplay,Pagination,Navigation]}
                    className="mySwiper w-full"
                    autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    }}
                    navigation={true}
                    breakpoints={{
                        1024:{slidesPerView:2,}
                    }}
                    
                > 
                    {
                        Courses?.map( (course, index) => (
                            <SwiperSlide key = {index}>
                                <Course_Card course = {course} Height = {"h-[250px]"} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ) : (
                <p  className="text-xl text-richblack-5">No course Found</p>
            )
        }
    </>
  )
}

export default CourseSlider