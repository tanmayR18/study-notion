import React from 'react'
import RenderSteps from './RenderSteps'
import { courseAddTip } from '../../../../data/courseAddTips'


const AddCourse = () => {
  return (
    <div>
        <div className=' flex w-full items-start gap-x-6'>
            <div className=' flex flex-1 flex-col'>
                <h1 className=' mb-14 text-3xl font-medium text-richblack-5'>
                    Add Course
                </h1>
                <div className=' flex-1'>
                    <RenderSteps/>
                </div>
            </div>
                
            {/* Course upload tips */}
            <div className=' sticky top-10  max-w-[400px] flex-1 rounded-md border-[1px]'>
                <p className=' mb-8 text-lg text-richblack-5'>
                    ⚡ Course Upload Tips
                </p>
                <ul className=' ml-5 list-item list-disc space-y-4 text-xs text-richblack-5'>
                    {
                        courseAddTip.map( (tip, index) => (
                            <li key={index}>
                                {tip}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default AddCourse