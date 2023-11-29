import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
// var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Statistics extends Component {
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			axisX: {
				title: "activity",
				reversed: true,
			},
			axisY: {
				title: "Last Year Comparison",
				includeZero: true,
			},
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  12, label: "Inventory Tracking" },
					{ y:  7.5, label: "Hours Learned" },
					{ y:  25, label: "Finished Courses" },
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default Statistics;