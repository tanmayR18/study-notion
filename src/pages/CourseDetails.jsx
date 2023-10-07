import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import { useEffect } from 'react'
import GetAvgRating from '../utils/avgRating'
import Spinner from '../components/common/Spinner'
import Error from '../components/common/Error'
import RatingStars from '../components/common/RatingStars'
import { formatDate } from '../services/formatDate'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard'
import ConfirmationModal from '../components/common/ConfirmationModal'

const CourseDetails = () => {

    const { user } = useSelector(state => state.profile)
    const { token } = useSelector( state => state.auth)
    const { loading } = useSelector( state => state.profile)
    const { paymentLoading } = useSelector( state => state.course)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { courseId } = useParams()

    const [ courseData, setCourseData ] = useState(null)
    const [ confirmationModal, setConfirmationModal ] = useState(null)
    const [ isActive, setIsActive ] = useState(Array(0))

    useEffect(()=> {
        const getCourseFullDetails = async() => {
            try{
                const result = await fetchCourseDetails(courseId);
                console.log("Printing CourseData-> " , result);
                setCourseData(result);
            }
            catch(error) {
                console.log("Could not fetch coursse details");
            }
        }
        getCourseFullDetails();
        
    }, [courseId]);

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(()=> {
        console.log("Average rating 1",courseData?.data)
        console.log("Average rating 2",courseData?.data?.courseDetails.ratingAndReviews)
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        console.log("Average rating of the course",count)
        setAverageReviewCount(count);
    },[courseData])

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(()=> {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);

    },[courseData]);


    const handleBuyCourse = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch)
            return
        }

        setConfirmationModal({
            text1:"you are not Logged in",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        })
    }


    if( !courseData){
        return (
            <Spinner/>
        )
    }

    if(!courseData.success) {
        return (
            <Error/>
        )
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail, 
        price,
        whatYouWilLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentEnrolled,
        createdAt,
    } = courseData.data?.courseDetails

    

    
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ?
            isActive.concat(id) :
            isActive.filter((i) => i !== id )
        )
    }


  return (
    <div className=' flex flex-col  text-white'>
        <div className=' relative flex flex-col justify-start p-8'>
            <p>{courseName}</p>
            <p>{courseDescription}</p>
            <div className=' flex gap-x-2'>
                <span>{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} /> 
                <span>{`${ratingAndReviews.length} reviews`}</span>
                <span>{`${studentEnrolled.length} students enrolled`}</span>
            </div>

            <div>
                <p>Created By {`${instructor.firstName}`}</p>
            </div>

            <div className=' flex gap-x-3'>
                <p>
                    Created At {formatDate(createdAt)}
                </p>
                <p>
                    {" "} English 
                </p>
            </div>

            <div>
                <CourseDetailsCard 
                    course = { courseData?.data?.courseDetails}
                    setConfirmationModal = {setConfirmationModal}
                    handleBuyCourse = {handleBuyCourse}
                />
            </div>
        </div>

        <div>
            <p>What You Will learn</p>
            <div>
                {whatYouWilLearn}
            </div>
        </div>

        <div>
            <div>
                <p>Course Content</p>
            </div>

            <div className=' flex gap-x-3 justify-between'>
                <div>
                    <span>{courseContent.length} sections</span>

                    <span>
                        {totalNoOfLectures} lectures
                    </span>

                    <span>
                        {courseData.data?.totalDuration} total Duration
                    </span>
                </div>

                <div>
                    <button 
                    onClick={() => setIsActive([])}
                    >
                        COllapse all Sections
                    </button>
                </div>

            </div>

        </div>

        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal} />
        }
    </div>
  )
}

export default CourseDetails