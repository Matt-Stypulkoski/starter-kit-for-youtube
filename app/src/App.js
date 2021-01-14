import './App.css';
import { React, Component } from 'react';
import youtubeSearch from './scripts/youtubeSearch.js';
import sortResults from './scripts/sortResults.js';
import VideoResultContainer from './components/VideoResultContainer';

class App extends Component {
    constructor(props) {
        super(props);
        //this.displayResults = this.displayResults.bind(this)
        this.runSearch = this.runSearch.bind(this);
        this.simplifyLargeNumber = this.simplifyLargeNumber.bind(this);
        this.state = {
            averageViews: 0,
            totalViews: 0,
            keyword: '',
            videoResults: [],
            hasSearched: false
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

    render() {
        let resultsContainer;
        if (!this.state.hasSearched) {
            resultsContainer = <p className="placeholder-text">Search for a keyword to display results</p>
        } else {
            resultsContainer = <VideoResultContainer videoList={this.state.videoResults} />
        }


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
                {resultsContainer}
            </div>
        );
    }
}

export default App;
