import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../../utils/constant'
import toast from 'react-hot-toast'
import { addToCart, removeFromCart } from '../../../slices/cartSlice'
import copy from 'copy-to-clipboard'

const CourseDetailsCard = ({ course, setConfirmationModal, handleBuyCourse}) => {

    const { user } = useSelector( state => state.profile)
    const { token } = useSelector( state => state.auth)
    const { cart } = useSelector( state => state.cart);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice
    } = course

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an instructor, you can't buy a course")
            return
        }
        if(token){
            console.log("dispatching add to cart")
            dispatch(addToCart(course))
            return
        }
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1text:"login",
            btn2Text:"cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }

    const handleRemoveToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an instructor, you can't buy a course")
            return
        }
        if(token){
            console.log("dispatching remove to cart")
            dispatch(removeFromCart(course._id))
            return
        }
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1text:"login",
            btn2Text:"cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }

    
    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard")
    }

  return (
    <div>
        <img 
            src={ThumbnailImage}
            alt='Thumbnail image'
            className=' max-h-[300px] min-h-[180px] w-[400px] rounded-xl'
        />
        <div>
            Rs. {CurrentPrice}
        </div>
        <div className=' flex flex-col gap-y-6'>
            <button 
            className=' bg-yellow-50 w-fit text-richblack-900'
            onClick={
                user && course?.studentEnrolled.includes(user?._id) ?
                () => navigate("/dashboard/enrolled-courses") :
                handleBuyCourse
            }
            >
                {
                    user && course?.studentEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
                }
            </button>

            {
                !course?.studentEnrolled.includes(user?._id) &&
                (cart.some( item => item._id === course._id) ?
                <button
                onClick={handleRemoveToCart}
                className=' bg-yellow-50 w-fit text-richblue-900'
                >
                    Remove from cart
                </button>
                :
                <button
                onClick={handleAddToCart}
                className=' bg-yellow-50 w-fit text-richblue-900'
                >
                    Add to Cart
                </button>)
            }
            
        </div>

        <div>
            <p>
                30-Day Money-Back Guarantee
            </p>
            <p>
                This Course Includes
            </p>
            <div className=' flex flex-col gap-y-3'>
                {
                    course?.instructions?.map( (item, index) => (
                        <p key={index} className=' flex gap-2'>
                            <span>{item}</span>
                        </p>
                    ))
                }
            </div>
            <div>
                <button
                className=' mx-auto flex items-center gap-2 p-6 text-yellow-50'
                onClick={handleShare}
                >
                    Share
                </button>
            </div>
        </div>
    </div>
  )
}

export default CourseDetailsCard
