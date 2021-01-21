import './App.css';
import { React, Component } from 'react';
import VideoResultContainer from './components/VideoResultContainer.js';
import StatBoxContainer from './components/StatBoxContainer.js';
import InputHeader from './components/InputHeader.js';
import TimeDataGraph from './components/TimeDataGraph.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.simplifyLargeNumber = this.simplifyLargeNumber.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
        this.state = {
            averageViews: 0,
            totalViews: 0,
            keyword: '',
            videoResults: [],
            allTimesPublished: {},
            hasSearched: false,
            useDateRange: false
        }
    }

    simplifyLargeNumber(num) {
        let count = 0;
        while ((num > 999) && (count < 3)) {
            num /= 1000;
            count += 1
        }
        switch (count) {
            case 1:
                num = Math.round(num * 10) / 10;
                return `${num}K`
            case 2:
                num = Math.round(num * 10) / 10;
                return `${num}M`
            case 3:
                num = Math.round(num * 10) / 10;
                return `${num}B`
            default:
                return num
        }
    }

    getSearchResults(totalViews, averageViews, videoResults, allTimesPublished) {
        this.setState({
            totalViews: totalViews,
            averageViews: averageViews,
            videoResults: videoResults,
            allTimesPublished: allTimesPublished,
            hasSearched: true
        });
    }

    render() {
        console.log(this.state);
        let resultsContainer;
        if (!this.state.hasSearched) {
            resultsContainer = <p className="placeholder-text">Search for a keyword to display results</p>
        } else {
            resultsContainer = <VideoResultContainer videoList={this.state.videoResults} />
        }

        return (
            <div className="App">
                <InputHeader onSearch={this.getSearchResults}/>
                <StatBoxContainer statBoxList={[[this.simplifyLargeNumber(this.state.averageViews), "Average Views"],
                                                [this.simplifyLargeNumber(this.state.totalViews), "Total Views"],
                                                [this.simplifyLargeNumber(this.state.popularity), "Overall Interest"]]} />
                <TimeDataGraph videoData={this.state.allTimesPublished} />
                {resultsContainer}
            </div>
        );
    }
}

export default App;
