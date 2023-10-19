import React, { useEffect, useState } from 'react'
import GetAvgRating from '../../../utils/avgRating'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'

const Course_Card = ({course, Height}) => {

    const [ avgReviewCount, setAvgReviewCount ] = useState(0)

    useEffect( () => {
        const count = GetAvgRating(course.ratingAndReviews);
        console.log("Here is the average rating", course)
        setAvgReviewCount(count)
    }, [course])

  return (
    <div>
        <Link to={`/course/${course._id}`}>
            <div className=''>
                <div className=' rounded-lg'>
                    <img 
                        src={course?.thumbnail}
                        alt='course ka thumbnail'
                        className={`${Height} w-full rounded-xl object-cover`}
                    />
                </div>
                <div className=' flex flex-col gap-2 px-1 py-3'>
                    <p className=' lg:text-xl md:text-xl text-base font-bold text-richblack-5 '>{course?.courseName}</p>
                    <p className=' text-sm text-richblack-50'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className=' flex flex-col gap-2'>
                        <div className=' flex gap-4 lg:text-base md:text-base text-sm'>
                            <span className="text-yellow-5">{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p className="lg:text-xl md:text-xl text-base text-richblack-5">₹ {course?.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card