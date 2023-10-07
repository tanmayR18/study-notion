import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

const Cart = () => {

    const { total, totalItems } = useSelector( state => state.cart)


  return (
    <div className=' text-white'>
        <h1 className=' text-3xl text-richblack-5 font-medium mb-10'> Your Cart</h1>
        <p className=' text-richblack-300 font-semibold text-base border-b pb-4 border-b-richblack-700'>{totalItems || 0} Courses in Cart</p>

        {
            total > 0 ?
            <div>
                <RenderCartCourses/>
                <RenderTotalAmount/>
            </div> :
            <div className=' text-3xl text-richblack-100 flex justify-center items-center h-32 '>
                <p>Your Cart is Empty</p>
            </div>
        }
    </div>
  )
}

export default Cart