import { React, Component } from 'react';
import TimeDataBar from './TimeDataBar.js';

class TimeDataGraph extends Component {
    // props are videoData
    // videoData is a dict from 00 - 23 holding frequency a vid is published at that time
    constructor(props) {
        super(props);
        this.getBarData = this.getBarData.bind(this);
        this.state = {
            barMargin: 0.01 * this.props.width,
            barWidth: 0.03 * this.props.width
        }
    }

    //getBarData() {
    //    console.log(this.props.videoData);
    //    let publishTimeFreq = [];
    //    for (let key in [...Array(24).keys()]) {
    //        key = String(key).padStart(2, '0');
    //        publishTimeFreq.push(this.props.videoData[key]);
    //    }
    //    return publishTimeFreq.map(function (freq) {
    //        return <TimeDataBar freq={freq} />
    //    });
    //}

    getBarData() {
        console.log(this.props.videoData)
        let publishTimeFreq = [];
        for (let idx in [...Array(24).keys()]) {
            let hour = String(idx).padStart(2, '0');
            publishTimeFreq.push({
                key: hour,
                x: idx * (this.state.barWidth + this.state.barMargin),
                y: this.props.height - this.props.videoData[hour],
                width: this.state.barWidth,
                height: this.props.videoData[hour]
            });
        }
        return publishTimeFreq.map(function (barData) {
            return <TimeDataBar x={barData.x} y={barData.y} width={barData.width} height={barData.height} />
        })
    }

    /*
                <div className="time-data-graph-component-container">
                <div className="time-data-graph-header">
                    <h4>Upload Times:</h4>
                </div>
                <div className="time-data-graph-container">
                    <div className="data-container">
                        {this.getBarData()}
                    </div>
                    <div className="labels-container">
                        {Object.keys(this.props.videoData).map(function (key) {
                            return <span>key</span>
                        })}
                    </div>
                </div>
            </div>
    */
    render() {
        return (
            <div className="upload-times-container">
                <h4>UPLOAD TIMES</h4>
                <svg viewBox={`0 0 ${this.props.width} ${this.props.height}`} height={this.props.height} width={this.props.width}>
                    {this.getBarData()}
                </svg>
            </div>
        );
    }

}

export default TimeDataGraph;