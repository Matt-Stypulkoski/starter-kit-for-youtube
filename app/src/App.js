import './App.css';
import { React, Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.youtubeSearch = this.youtubeSearch.bind(this);
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
        if (num / 1000000000 >= 1) {
            return `${Math.ceil(num / 10000000000)}B`;
        }
        if (num / 1000000 >= 1) {
            return `${Math.ceil(num / 1000000)}M`;
        }
        if (num / 1000 >= 10) {
            return `${Math.ceil(num / 1000)}K`;
        }
        return num
    }

    displayResults(results) {
        let resultsContainer = document.getElementById("results-container");
        let resultsContainerChildren = resultsContainer.children;
        resultsContainerChildren[0].remove();
        let resultsHeader = document.createElement("h3");
        resultsHeader.innerHTML = "Popular Videos";
        resultsHeader.className = "popular-videos-header";
        let resultsList = document.createElement("ul");
        resultsList.className = "results-list";
        resultsList.appendChild(resultsHeader);

        var totalViews = 0;
        var sortedVidList = []

        for (let vid of results) {
            let videoListElement = document.createElement("li");
            videoListElement.className = "video-list-element";

            let videoListElementContainer = document.createElement("div");
            videoListElementContainer.className = "video-list-element-container";

            let videoDataContainer = document.createElement("div");
            videoDataContainer.className = "video-data-container";

            videoListElementContainer.appendChild(videoDataContainer);
            videoListElement.appendChild(videoListElementContainer);

            const title = document.createElement("h3");
            title.innerHTML = vid.snippet.title;
            title.className = "vid-title";

            const views = document.createElement("h4");
            views.innerHTML = `Views: ${vid.statistics.viewCount}`;
            views.className = "vid-views";

            totalViews += parseInt(vid.statistics.viewCount);

            const thumbnailURL = document.createElement("img");
            thumbnailURL.src = vid.snippet.thumbnails.high.url;
            thumbnailURL.alt = `Thumbnail for ${vid.snippet.title}`;
            thumbnailURL.className = "vid-thumbnail";

            videoDataContainer.appendChild(title);
            videoDataContainer.appendChild(views);
            videoListElementContainer.appendChild(thumbnailURL);

            sortedVidList.push([videoListElement, vid.statistics.viewCount]);
        }

        sortedVidList = sortedVidList.sort(function (a, b) {
            return b[1] - a[1];
        });

        for (let vidArr of sortedVidList) {
            resultsList.appendChild(vidArr[0]);
        }

        this.setState({
            averageViews: totalViews / sortedVidList.length,
            totalViews: totalViews
        });
        resultsContainer.appendChild(resultsList);
    }

    youtubeSearch() {
        let keyword = document.getElementById("search-keyword").value;
        if (keyword === "") {
            console.log("You must input a keyword to search for.");
            return
        }
        this.setState({ keyword: keyword });
        console.log(`Searching through youtube for ${keyword}`);

        return axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
            params: {
                'part': 'snippet',
                'maxResults': 50,
                'key': process.env.REACT_APP_YOUTUBE_API_KEY,
                'q': keyword,
                'type': 'video',
            }
        })
            .then(res => {
                console.log(res);
                let videoList = res.data.items;
                let vidIdList = [];
                for (let i = 0; i < videoList.length; i++) {
                    let vidId = videoList[i].id.videoId;
                    vidIdList.push(vidId);
                }
                return axios.get(`https://youtube.googleapis.com/youtube/v3/videos`, {
                    params: {
                        "part": "snippet,statistics",
                        "id": vidIdList.join(),
                        "key": process.env.REACT_APP_YOUTUBE_API_KEY,
                    }
                })
                    .then((result) => {
                        console.log(result.data.items);
                        this.displayResults(result.data.items); 
                    });
            })
    }



    render() {
        return (
            <div className="App">
                <header className="search-header">
                    <input type="text" id="search-keyword" placeholder="Input Keyword Here" defaultValue="nuzlocke" />
                    <button onClick={this.youtubeSearch}>Search</button>
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
