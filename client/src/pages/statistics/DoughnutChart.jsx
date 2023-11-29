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
const DoughnutChart = () => {
    const data ={
        labels:["art1","art2","art3","art4","art5","art6","art7"],
        datasets: [{
            label:"number of articles",
            data: [4,7,8,3,6,5,9],
           backgroundColor:[
            'rgba(255, 99, 132,0.7)',
            'rgba(255, 159, 64,0.7)',
            'rgba(255, 205, 86,0.7)',
            'rgba(75, 192, 192,0.7)',
            'rgba(54, 162, 235,0.7)',
            'rgba(153, 102, 255,0.7)',
            'rgba(201, 203, 207,0.7)'
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

export default DoughnutChart