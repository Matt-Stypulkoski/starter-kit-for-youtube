import './App.css';
import { React, Component } from 'react';
import VideoResultContainer from './components/VideoResultContainer.js';
import StatBoxContainer from './components/StatBoxContainer.js';
import InputHeader from './components/InputHeader.js';
import BarChart from './components/BarChart.js';


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
        let resultsContainer;
        let statContainer;
        if (!this.state.hasSearched) {
            resultsContainer = <p className="placeholder-text">Search for a keyword to display results</p>
            statContainer = <h3>Search a term to return results</h3>
           
        } else {
            resultsContainer = <VideoResultContainer videoList={this.state.videoResults} />
            statContainer =
                <div className="all-stats-container">
                    <StatBoxContainer statBoxList={[
                        {
                            "value": this.simplifyLargeNumber(this.state.averageViews),
                            "label": "Average Views"
                        },
                        {
                            "value": this.simplifyLargeNumber(this.state.totalViews),
                            "label": "Total Views"
                        },
                        {
                            "value": this.state.popularity,
                            "label": "Overall Interest"
                    }]} />
                    <BarChart uploadTimeData={this.state.allTimesPublished} datasetKeyProvider={this.state.keyword} />
                </div>
        }
        return (
            <div className="App">
                <InputHeader onSearch={this.getSearchResults} />
                {statContainer}
                {resultsContainer}
            </div>
        );
    }
}

export default App;
