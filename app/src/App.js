import './App.css';
import { React, Component } from 'react';
import Header from './components/Header/Header.js';
import VideoResultContainer from './components/VideoResultContainer/VideoResultContainer.js';
import StatBoxContainer from './components/StatBoxContainer/StatBoxContainer.js';
import InputHeader from './components/InputHeader/InputHeader.js';
import BarChart from './components/BarChart/BarChart.js';
const Loader = require('react-loaders').Loader;


class App extends Component {
    constructor(props) {
        super(props);
        this.simplifyLargeNumber = this.simplifyLargeNumber.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
        this.setLoader = this.setLoader.bind(this);
        this.state = {
            averageViews: 0,
            totalViews: 0,
            keyword: '',
            videoResults: [],
            allTimesPublished: {},
            hasSearched: false,
            useDateRange: false,
            isSearching: false
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
            hasSearched: true,
            isSearching: false
        });
    }

    setLoader() {
        this.setState({ isSearching: true })
    }

    render() {
        let resultsContainer;
        let statContainer;
        let content;
        if (this.state.isSearching) {
            content =
                <div className="content">
                    <InputHeader onSearch={this.getSearchResults} isSearching={this.setLoader} />
                    <Loader type="line-scale" active />
                </div>
        }
        else if (!this.state.hasSearched) {
            content =
                <div className="content">
                    <InputHeader onSearch={this.getSearchResults} isSearching={this.setLoader} />
                    <p>Enter a search term to display results</p>
                </div>
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
                        }]} />
                    <BarChart uploadTimeData={this.state.allTimesPublished} />
                </div>
            content = 
                <div className="content">
                    <InputHeader onSearch={this.getSearchResults} isSearching={this.setLoader} />
                    {statContainer}
                    <h2 className="video-results-list-header">Popular Uploads</h2>
                    {resultsContainer}
                </div>
        }
        return (
            <div className="App">
                <Header />
                {content}
            </div>
        );
    }
}

export default App;
