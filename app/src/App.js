import './App.css';
import { React, Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.youtubeSearch = this.youtubeSearch.bind(this);
    }

    componentDidMount() {
        // Just for testing displaying results. Uncomment to immediately search a keyword.
        //this.youtubeSearch();
    }

    displayResults(results) {
        let resultsContainer = document.getElementById("results-container");
        let resultsContainerChildren = resultsContainer.children;
        resultsContainerChildren[0].remove();
        let resultsList = document.createElement("ul");


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

            const thumbnailURL = document.createElement("img");
            thumbnailURL.src = vid.snippet.thumbnails.high.url;
            thumbnailURL.alt = `Thumbnail for ${vid.snippet.title}`;
            thumbnailURL.className = "vid-thumbnail";

            videoDataContainer.appendChild(title);
            videoDataContainer.appendChild(views);
            videoListElementContainer.appendChild(thumbnailURL);

            resultsList.appendChild(videoListElement);
        }

        resultsContainer.appendChild(resultsList);
    }

    youtubeSearch() {
        let keyword = document.getElementById("search-keyword").value;
        if (keyword === "") {
            console.log("You must input a keyword to search for.");
            return
        }
        console.log(`Searching through youtube for ${keyword}`);

        return axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
            params: {
                'part': 'snippet',
                'maxResults': 10,
                'key': process.env.REACT_APP_YOUTUBE_API_KEY,
                'q': keyword,
                'type': 'video'
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
                <input type="text" id="search-keyword" placeholder="Input Keyword Here" defaultValue="test" />
                <button onClick={this.youtubeSearch}>Search</button>
                <div className="results-container" id="results-container">
                    <p className="placeholder-text">Search for a keyword to display results</p>
                </div>
            </div>
        );
    }
}

export default App;
