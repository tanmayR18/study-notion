import React from 'react'

const stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const Stats = () => {
  return (
    <section>
        <div className='flex gap-14 bg-richblack-800 flex-wrap justify-center py-24  px-32'>
            {
                stats.map( (data, index) => (
                    <div key={index} className=' flex flex-col items-center'>
                        <h1 className=' font-bold text-3xl'>
                            {data.count}
                        </h1>
                        <h2 className=' text-center font-bold text-richblack-500'>
                            {data.label}
                        </h2>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Stats