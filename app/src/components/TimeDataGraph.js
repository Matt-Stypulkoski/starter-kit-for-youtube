import { React, Component } from 'react';
import TimeDataBar from './TimeDataBar.js';

class TimeDataGraph extends Component {
    // props are videoData
    // videoData is a dict from 00 - 23 holding frequency a vid is published at that time
    constructor(props) {
        super(props);
        this.getBarData = this.getBarData.bind(this);
    }

    getBarData() {
        console.log(this.props.videoData);
        let publishTimeFreq = [];
        for (let key in [...Array(24).keys()]) {
            key = String(key).padStart(2, '0');
            publishTimeFreq.push(this.props.videoData[key]);
        }
        return publishTimeFreq.map(function (freq) {
            return <TimeDataBar freq={freq} />
        });
    }

    render() {
        return (
            <div className="time-data-graph-component-container">
                <div className="time-data-graph-header">
                    <h4>Upload Times:</h4>
                </div>
                <div className="time-data-graph-container">
                    <div className="data-container">
                        {this.getBarData()}
                    </div>
                    <div className="labels-container">

                    </div>
                </div>
            </div>
        );
    }

}

export default TimeDataGraph;