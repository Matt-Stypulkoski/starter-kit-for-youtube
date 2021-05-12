import axios from 'axios';

function youtubeSearch(searchParams) {
    // For now if no keyword is given, send an alert to browser. Need to change in future.
    /*
    searchParams = {
        <string> q,
        <string> regionCode,
        <datetime> publishedBefore,
        <datetime> publishedAfter
    }
    */
    let keyword = searchParams.q;
    if (keyword === "") {
        console.log("You must input a keyword to search for.");
        return Promise.reject(new Error("You must input a keyword to search for."))
    }
    console.log(`Searching through youtube for ${keyword}`);

    let publishedBefore = (searchParams.publishedBefore !== '') ? new Date(searchParams.publishedBefore).toISOString() : new Date().toISOString();
    let publishedAfter = (searchParams.publishedAfter !== '') ? new Date(searchParams.publishedAfter).toISOString() : '1970-01-01T00:00:00Z';

    console.log(publishedBefore)
    console.log(publishedAfter)

    return axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
        params: {
            'part': 'snippet',
            'maxResults': 50,
            'key': process.env.REACT_APP_YOUTUBE_API_KEY,
            'q': keyword,
            'type': 'video',
            'regionCode': searchParams.regionCode,
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
                    "part": "snippet,statistics,contentDetails",
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

export { youtubeSearch };