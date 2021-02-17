import { React, Component }  from 'react';
import { Bar } from 'react-chartjs-2';


class BarChart extends Component {
    constructor(props) {
        super(props);
        let graphData = setGraphData(this.props)

        this.state = {
            key: this.props.datasetKeyProvider,
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

function setGraphData(graphDataProps) {
    let data = [];
    let xLabels = [];
    for (let idx in [...Array(24).keys()]) {
        let hour = String(idx).padStart(2, '0');
        xLabels.push(hour)
        data.push(graphDataProps.uploadTimeData[hour]);
    }
    let graphData = {
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
    return graphData
}

export default BarChart;