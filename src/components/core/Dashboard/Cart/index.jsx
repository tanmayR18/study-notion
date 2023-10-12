import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

const Cart = () => {

    const { total, totalItems } = useSelector( state => state.cart)


  return (
    <>
        <h1 className=' text-3xl text-richblack-5 font-medium mb-14'> Your Cart</h1>
        <p className=' text-richblack-300 font-semibold text-base border-b pb-4 border-b-richblack-700'>{totalItems || 0} Courses in Cart</p>

        {
            total > 0 ?
            <div className=' mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row'>
                <RenderCartCourses/>
                <RenderTotalAmount/>
            </div> :
            <div className=' mt-14 text-3xl text-richblack-100 flex justify-center items-center'>
                Your Cart is Empty
            </div>
        }
    </>
  )
}

export default Cart