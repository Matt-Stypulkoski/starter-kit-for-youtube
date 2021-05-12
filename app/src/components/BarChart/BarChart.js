import { React, Component }  from 'react';
import { Bar } from 'react-chartjs-2';

const ONE_HOUR = 3600000 // One hour represented as milliseconds
const START_TIME = new Date('December 24 1995').getTime(); // Argbitrary date. Just needed to get the hours.

class BarChart extends Component {
    constructor(props) {
        super(props);
        let graphData = setGraphData(this.props)

        this.state = {
            uploadData: this.props.uploadTimeData,
            graphData: graphData
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return (nextProps.uploadTimeData !== prevState.uploadData) ? { graphData: setGraphData(nextProps) } : null;
    }

    render() {
        return (
            <div className="bar-chart-container">
                <Bar
                    data={this.state.graphData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        tooltips: {
                            callbacks: {
                                title: function (context) {
                                    console.log(context)
                                    var label = context[0].label || '';
                                    console.log(label);

                                    if (label) {
                                        let hour = new Date(label).getHours();
                                        let nextHour = hour + 1;

                                        hour = convertTimes12HourClock(hour);
                                        nextHour = convertTimes12HourClock(nextHour);

                                        label = `Between ${hour} and ${nextHour}`;
                                    }
                                    
                                    return label;
                                },
                                label: function (context) {
                                    console.log(context)
                                    var label = context.value || '';
                                    console.log(label);

                                    if (label) {
                                        let vid_grammar = (label === '1') ? 'video' : 'videos'
                                        label = `${label} ${vid_grammar} uploaded`;
                                    }
                                    return label;
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Upload Times',
                            fontSize: 20,
                            fontColor: 'rgb(30, 30, 49)'
                        },
                        legend: {
                            display: false,
                            position: 'right',
                        },
                        scales: {
                            xAxes: [{
                                offset: true,
                                type: 'time',
                                time: {
                                    unit: 'hour'
                                },
                                gridLines: {
                                    display: true,
                                    offsetGridLines: true,
                                },
                                ticks: {
                                    fontSize: 10,
                                    autoSkip: true,
                                    fontColor: 'rgb(30, 30, 49)',
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Hours',
                                    fontColor: 'rgb(30, 30, 49)',
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    display: true
                                },
                                ticks: {
                                    fontSize: 10,
                                    autoSkip: true,
                                    stepSize: 2,
                                    fontColor: 'rgb(30, 30, 49)'
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Videos Uploaded',
                                    fontColor: 'rgb(30, 30, 49)'
                                }
                            }]
                        }
                    }}
                />
            </div>
        );
    }
}

function setGraphData(graphDataProps) {
    let data = [];
    let xLabels = [];
    for (let idx in [...Array(24).keys()]) {
        let hour = String(idx).padStart(2, '0');
        xLabels.push(START_TIME + (idx * ONE_HOUR));
        data.push(graphDataProps.uploadTimeData[hour]);
    }
    let graphData = {
        labels: xLabels,
        datasets: [
            {
                backgroundColor: 'rgba(196,0,0,1)',
                borderColor: 'rgba(0,0,0,1)',
                hoverBackgroundColor: 'rgba(138,0,0,1)',
                borderWidth: 1,
                barPercentage: 1.0,
                categoryPercentage: 1.0,
                data: data
            }
        ]
    }
    return graphData
}


function convertTimes12HourClock(hour) {
    let suffix = (hour >= 12) ? 'PM' : 'AM';
    hour = (hour % 12);
    if (hour === 0) { hour = 12 };
    return `${hour}${suffix}`;
} 


export default BarChart;