import React,{useEffect,useState} from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js"

import {Doughnut} from "react-chartjs-2"

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)
const DaughnutChartGender = () => {
    const data ={
        labels:["Children","Men","Women"],
        datasets: [{
            label:"number of articles",
            data: [4,17,8],
           backgroundColor:[
            'rgba(75, 192, 192, 0.4)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(153, 102, 255, 0.4)',
           
        ],
            borderWidth:1,
            hoverOffset: 10

        }]
    }
    const options = {
        responsive : true,
        scales:{
            y:{
                beginAtzero:true
            }
        }
    }

  return (
    <div>
        <Doughnut
        data={data}
        options={options}
        ></Doughnut>
    </div>
  )
}

export default DaughnutChartGender