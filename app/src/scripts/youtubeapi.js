import axios from 'axios';

function youtubeSearch(keyword) {
    // For now if no keyword is given, send an alert to browser. Need to change in future.
    if (keyword === "") {
        console.log("You must input a keyword to search for.");
        return Promise.reject(new Error("You must input a keyword to search for."))
    }
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
            console.log("Search Results:\n");
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
                    console.log("Video Results:\n");
                    console.log(result);
                    return result.data.items;
                });
        })
}

function youtubeSearchWithDateFilter(keyword, publishedAfter, publishedBefore) {
    // For now if no keyword is given, send an alert to browser. Need to change in future.
    if (keyword === "") {
        console.log("You must input a keyword to search for.");
        return Promise.reject(new Error("You must input a keyword to search for."))
    }
    console.log(`Searching through youtube for ${keyword}`);

    // Fix formatting of parameters to match what youtube api wants
    publishedAfter += 'T00:00:00Z';
    publishedBefore += 'T00:00:00Z';

    return axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
        params: {
            'part': 'snippet',
            'maxResults': 50,
            'key': process.env.REACT_APP_YOUTUBE_API_KEY,
            'q': keyword,
            'type': 'video',
            'publishedAfter': publishedAfter,
            'publishedBefore': publishedBefore
        }
    })
        .then(res => {
            console.log("Search Results:\n");
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
                    console.log("Video Results:\n");
                    console.log(result);
                    return result.data.items;
                });
        })
}

function getYoutubeContentRegions() {
    return axios.get(`https://youtube.googleapis.com/youtube/v3/i18nRegions`, {
        params: {
            "part": "snippet",
            "key": process.env.REACT_APP_YOUTUBE_API_KEY
        }
    })
        .then((result) => {
            return result.data.items;
        })
}

export { youtubeSearch, youtubeSearchWithDateFilter, getYoutubeContentRegions };