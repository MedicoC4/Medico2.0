import React,{useEffect,useState} from 'react'
import {
    Chart as ChartJS,
LineElement,
CategoryScale,
LinearScale,
PointElement,
Legend,
Tooltip
} from "chart.js"
import {Line} from "react-chartjs-2"

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)
const LineChart = () => {
    const data = {
        labels : ["mon","tues","thures","wed"],
        datasets: [{
            label: "sales of the week",
            data: [7,3,6,2],
            backgroundColor:"rgba(75, 192, 192, 0.2)",
            borderColor:"rgba(75, 192, 192, 0.6)",
            pointBorderColor:"black",
            fill:true,
            tension:0.3,
            hoverOffset: 4

        
        }]
    }
    const options = {
        responsive : true,
        plugins:{
            legend:true
        },
        // scales:{
        //     y:{
        //         // min:3,
        //         // max:6
        //     }
        // }
    }

  return (
    <div >
        <Line
        data = {data}
        options = {options}
        ></Line>
    </div>
  )
}

export default LineChart