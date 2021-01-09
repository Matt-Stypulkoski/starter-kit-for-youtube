import logo from './logo.svg';
import './App.css';
import { React, Component } from 'react';
import axios from 'axios';
//import { gapi } from 'gapi-script';

class App extends Component {

    youtubeSearch() {
        var keyword = document.getElementById("search-keyword").value;
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
                var videoList = res.data.items;
                var vidIdList = [];
                for (var i = 0; i < videoList.length; i++) {
                    var vidId = videoList[i].id.videoId;
                    vidIdList.push(vidId);
                }
                return axios.get(`https://youtube.googleapis.com/youtube/v3/videos`, {
                    params: {
                        "part": 'statistics',
                        "id": vidIdList.join(),
                        "key": process.env.REACT_APP_YOUTUBE_API_KEY,
                    }
                })
                    .then(result => {
                        console.log(result);
                    });
            })
    }

    render() {
        return (
            <div className="App">            
                <header className="App-header">
                    <input type="text" id="search-keyword" placeholder="Input Keyword Here" required />
                    <button onClick={this.youtubeSearch}>Search</button>
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
