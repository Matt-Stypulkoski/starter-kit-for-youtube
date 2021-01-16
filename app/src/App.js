import './App.css';
import { React, Component } from 'react';
import { youtubeSearch, youtubeSearchWithDateFilter } from './scripts/youtubeapi.js';
import sortResults from './scripts/sortResults.js';
import VideoResultContainer from './components/VideoResultContainer.js';
import StatBoxContainer from './components/StatBoxContainer.js'

class App extends Component {
    constructor(props) {
        super(props);
        this.runSearch = this.runSearch.bind(this);
        this.getTodaysDate = this.getTodaysDate.bind(this);
        this.simplifyLargeNumber = this.simplifyLargeNumber.bind(this);
        this.toggleDateField = this.toggleDateField.bind(this);
        this.state = {
            averageViews: 0,
            totalViews: 0,
            keyword: '',
            videoResults: [],
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

    runSearch() {
        const keyword = document.getElementById("search-keyword").value;
        console.log(keyword);
        this.setState({ keyword: keyword });
        if (this.state.useDateRange) {
            const publishedAfter = document.getElementById("start-date").value;
            const publishedBefore = document.getElementById("end-date").value;

            return youtubeSearchWithDateFilter(keyword, publishedAfter, publishedBefore)
                .then(results => {
                    console.log("SEARCHED WITH DATES");
                    let viewResults = sortResults(results);
                    this.setState({
                        totalViews: viewResults[0],
                        averageViews: viewResults[1],
                        videoResults: viewResults[2],
                        hasSearched: true
                    });

                    console.log(this.state);
                });
        }
        return youtubeSearch(keyword)
            .then(results => {
                let viewResults = sortResults(results);
                this.setState({
                    totalViews: viewResults[0],
                    averageViews: viewResults[1],
                    videoResults: viewResults[2],
                    hasSearched: true
                });

                console.log(this.state);
            });
    }

    getTodaysDate() {
        let today = new Date();
        let day = String(today.getDate()).padStart(2, '0');
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let year = today.getFullYear();
        return `${year}-${month}-${day}`
    }

    toggleDateField() {
        this.setState({ useDateRange: !this.state.useDateRange });
        console.log(this.state.useDateRange);
    }

    render() {
        let resultsContainer;
        if (!this.state.hasSearched) {
            resultsContainer = <p className="placeholder-text">Search for a keyword to display results</p>
        } else {
            resultsContainer = <VideoResultContainer videoList={this.state.videoResults} />
        }

        let dateRangeContainer;
        if (!this.state.useDateRange) {
            dateRangeContainer =
                <div>
                    <label htmlFor="use-date">Filter by Date Range:</label>
                    <input type="checkbox" id="use-date" onChange={(event) => this.toggleDateField()} />
                </div>
        } else {
            dateRangeContainer =
                <div>
                    <label htmlFor="use-date">Filter by Date Range:</label>
                    <input type="checkbox" id="use-date" onChange={(event) => this.toggleDateField()} />
                    <label htmlFor="start-date">Posted After:</label>
                    <input type="date" id="start-date" defaultValue={this.getTodaysDate()} />
                    <label htmlFor="start-date">Posted Before:</label>
                    <input type="date" id="end-date" defaultValue={this.getTodaysDate()} />
                </div>
        }
        return (
            <div className="App">
                <header className="search-header">
                    <input type="text" id="search-keyword" placeholder="Input Keyword Here" defaultValue="nuzlocke" />
                    <button onClick={this.runSearch}>Search</button>
                    {dateRangeContainer}
                </header>
                <StatBoxContainer statBoxList={[[this.simplifyLargeNumber(this.state.averageViews), "Average Views"],
                                                [this.simplifyLargeNumber(this.state.totalViews), "Total Views"],
                                                [this.simplifyLargeNumber(this.state.popularity), "Overall Interest"]]} />
                {resultsContainer}
            </div>
        );
    }
}

export default App;
