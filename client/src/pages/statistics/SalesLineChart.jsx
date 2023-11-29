import React,{useEffect,useState} from 'react'
import {
    Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js"
import {Bar} from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const SalesLineChart = () => {
    const [chartData,setChartData] = useState({
        datasets:[]
    })
    const [chartOption,setChartOption] = useState({})
    const [name,setName] = useState("week")
    const buttons = ()=>{
        if(name === "week"){
            setChartData({
                labels:["Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets:[{
                    label:"Sales at this week",
                    data:[23,58,69,74,15,44],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.4)',
                        'rgba(255, 159, 64, 0.4)',
                        'rgba(255, 205, 86, 0.4)',
                        'rgba(75, 192, 192, 0.4)',
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(153, 102, 255, 0.4)',
                        'rgba(201, 203, 207, 0.4)'
                    ],
                    borderColor:[
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                      ],
                      hoverOffset: 4,
                      borderRadius:10

                }]
            })
            setChartOption({
                responsive : true,
                Plugins:{
                    legend:{
                        position:"top"
                    },
                    title:{
                        display:true,
                        text:"Sales at this week"
                    }
                }
            })
        }
        if(name==="month"){
            setChartData({
                labels:["Monday","Tuesday", "Wednesday"],
                datasets:[{
                    label:"Sales at this week",
                    data:[40,80,15],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        
                    ],
                    borderColor:[
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                       
                      ],
                }]
            })
            setChartOption({
                responsive : true,
                Plugins:{
                    legend:{
                        position:"top"
                    },
                    title:{
                        display:true,
                        text:"Sales at this week"
                    }
                }
            })
        }
    }
    useEffect(()=>{
        buttons()
    },[])
  return (
    <div>
        <Bar options={chartOption} data={chartData}/>
    </div>
  )
}

export default SalesLineChart