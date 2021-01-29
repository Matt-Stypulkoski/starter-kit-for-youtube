import React from 'react';
import { Bar } from 'react-chartjs-2';


export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
        let data = [];
        let xLabels = [];
        for (let idx in [...Array(24).keys()]) {
            let hour = String(idx).padStart(2, '0');
            xLabels.push(hour)
            data.push(this.props.uploadTimeData[hour]);
        }
        this.state = {
            labels: xLabels,
            datasets: [
                {
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 1,
                    data: data
                }
            ]
        }
    }


    render() {
        console.log(Object.keys(this.props.uploadTimeData))
        return (
            <div>
                <Bar
                    data={this.state}
                    options={{
                        title: {
                            display: true,
                            text: 'Upload Times',
                            fontSize: 20
                        },
                        legend: {
                            display: false,
                            position: 'right'
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    fontSize: 10,
                                    autoSkip: true
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    fontSize: 10,
                                    autoSkip: true,
                                    stepSize: 2
                                }
                            }]
                        }
                    }}
                />
            </div>
        );
    }
}