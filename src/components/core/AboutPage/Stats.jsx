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
        <div className='flex gap-x-5'>
            {
                stats.map( (data, index) => (
                    <div key={index}>
                        <h1>
                            {data.count}
                        </h1>
                        <h2>
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