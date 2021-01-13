import './App.css';
import { React, Component } from 'react';
import axios from 'axios';
import VideoResult from './components/VideoResult.js';
import youtubeSearch from './scripts/youtubeSearch.js';
import displayResults from './scripts/displayResults.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.runSearch = this.runSearch.bind(this);
        this.simplifyLargeNumber = this.simplifyLargeNumber.bind(this);
        this.state = {
            averageViews: 0,
            totalViews: 0,
            keyword: ''
        }
    }

    componentDidMount() {
        // Just for testing displaying results. Uncomment to immediately search a keyword.
        //this.youtubeSearch();
    }

    simplifyLargeNumber(num) {
        let count = 0;
        while ((num > 1000) && (count < 3)) {
            num /= 1000;
            count += 1
        }
        switch (count) {
            case 0:
                return num;
            case 1:
                num = Math.round(num * 10) / 10;
                return `${num}K`
            case 2:
                num = Math.round(num * 10) / 10;
                return `${num}M`
            case 3:
                num = Math.round(num * 10) / 10;
                return `${num}B`
        }
    }

    runSearch() {
        const keyword = document.getElementById("search-keyword").value;
        console.log(keyword);
        this.setState({ keyword: keyword });
        return youtubeSearch(keyword)
            .then(results => {
                let viewResults = displayResults(results);
                this.setState({
                    totalViews: viewResults[0],
                    averageViews: viewResults[1]
                });
            });
    }

    render() {
        return (
            <div className="App">
                <header className="search-header">
                    <input type="text" id="search-keyword" placeholder="Input Keyword Here" defaultValue="nuzlocke" />
                    <button onClick={this.runSearch}> Search</button>
                </header>
                <div className="overview-stats-container">
                    <div className="single-stats-container">
                        <h2>{this.simplifyLargeNumber(this.state.averageViews)}</h2>
                        <h4>Average Views</h4>
                    </div>
                    <div className="single-stats-container">
                        <h2>{this.simplifyLargeNumber(this.state.totalViews)}</h2>
                        <h4>Total Views</h4>
                    </div>
                    <div className="single-stats-container">
                        <p>Videos about {this.state.keyword} are popular</p>
                    </div>
                </div>
                <div className="results-container" id="results-container">
                    <p className="placeholder-text">Search for a keyword to display results</p>
                </div>
            </div>
        );
    }
}

export default App;
