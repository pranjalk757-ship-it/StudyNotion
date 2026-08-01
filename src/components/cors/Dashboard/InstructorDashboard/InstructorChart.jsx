import React, { useState } from 'react'
import { Chart,registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2'
Chart.register(...registerables)
function InstructorChart({courses}) {
    const [chartData,setChartData] = useState('students');
    const generateRandomColor = (numColors)=>{
        const colors = []; 
        for(let i=0;i<numColors;i++){
            const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;

            colors.push(color);
        }
        return colors;
    }

    const chartStudentData = {
        labels:courses?.map((course)=>{return course.courseName}),
        datasets:[
            {
                data:courses?.map((course)=> course.totalStudentEnrolled),
                backgroundColor:generateRandomColor(courses?.length),
                hoverOffset:15
            }
        ]
    }

    const chartIncomeData = {
        labels:courses?.map((course)=> course.courseName),
        datasets :[ 
            {
                data: courses?.map((course)=>course.totalAmountGenerated),
                backgroundColor: generateRandomColor(courses?.length)
            }
        ]
    }
    const options = {
        maintainAspectRatio: false,
        plugins:{
            legend:{
                position:'top',
                labels:{
                    color:'#fff',
                    padding:20
                }
            }
        }

    }
  return (
    <div>
        <div className='flex flex-col rounded-md '>
            <div>
                <h2 className='text-md font-bold'>Visualize</h2>
            </div>
            <div className='flex flex-row gap-4 mt-4'>
                <button
                    onClick={()=>setChartData('students')}
                    className={`text-xs font-bold  px-4 py-1 rounded-md transition-all duration-200
                    ${chartData === 'students' ? 'text-yellow-100 bg-richblack-600':'text-yellow-500 bg-richblack-700'}
                    `}
                >
                    Students
                </button>
                <button
                    onClick={()=>setChartData('income')}
                    className={`text-xs font-bold  px-4 py-1 rounded-md transition-all duration-200
                    ${chartData === 'income' ? 'text-yellow-100 bg-richblack-600':'text-yellow-500 bg-richblack-700'}
                    `}
                >
                    Income
                </button>
            </div>
            <div className='mt-6 h-[400px] py-4'>
                <Pie
                    data={chartData === 'students' ? chartStudentData : chartIncomeData}
                    options={options}
                    
                ></Pie>
            </div>
        </div>
    </div>
  )
}

export default InstructorChart