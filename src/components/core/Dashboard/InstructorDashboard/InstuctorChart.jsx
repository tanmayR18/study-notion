// import { Chart, registerables } from 'chart.js'
import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { BsCheckLg } from 'react-icons/bs';

// Chart.register(...registerables)
ChartJS.register(ArcElement, Tooltip, Legend);

const InstuctorChart = ({courses}) => {

    const [ currChart, setCurrChart ] = useState("students")

    const generateRandomColors = (numColors) => {
        const colors = []
        for (let i = 0; i < numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)} )`
            colors.push(color)
        }
        return colors
    }

    const chartDataStudents = {
        labels : courses.map( course => course.courseName),
        datasets: [
            {
                label: 'no. of students',
                data: courses.map( course => course.totalStudentsEnrolled),
                backgroundColor: generateRandomColors(courses.length)
            }
        ]
    }

    const chartIncomeData = {
        labels : courses.map( course => course.courseName),
        datasets: [
            {
                label: 'amount ',
                data: courses.map( course => course.totalAmountGenerated),
                backgroundColor: generateRandomColors(courses.length)
            }
        ]
    }

    // Options for the chart
    const options = {
        maintainAspectRatio: false
    }

  return (
    <div className=' flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6'>
        <p className=' text-lg font-bold text-richblack-5'>Visualize</p>
        <div className=' space-x-4 font-semibold'>
            {/* Button to switch to the "students" chart */}
            <button 
            onClick={ () => setCurrChart("students")}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                currChart === "students" ?
                " bg-richblack-700 text-yellow-50" :
                " text-yellow-400"
            }`}
            >
                Students
            </button>
            {/* Button to switch to the icome chart */}
            <button 
            onClick={ () => setCurrChart("income")}
            className={` rounded-sm p-1 px-3 transition-all duration-200 ${
                currChart === "income" ?
                " bg-richblack-700 text-yellow-50" :
                " text-yellow-400"
            }`}
            >
                Income
            </button>
        </div>
        <div className=' h-full'>
            {/* Render the pie chart based on the selected chart */}
            <Pie 
                data={currChart === "students" ? chartDataStudents : chartIncomeData}
                options={options}
            />
        </div>
        {
            console.log(
                chartDataStudents,
                chartIncomeData
            )
        }
        {/* <Pie 
                data={currChart === "students" ? chartDataStudents : chartIncomeData}
                options={options}
        /> */}
    </div>
  )
}

export default InstuctorChart