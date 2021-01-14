function sortResults(results) {
    var totalViews = 0;
    var unsortedVidList = []

    for (let vid of results) {
        const title = vid.snippet.title;

        const views = vid.statistics.viewCount
        totalViews += parseInt(views);

        const thumbnailURL = vid.snippet.thumbnails.high.url;
        const altText = `Thumbnail for video titled "${title}"`;

        let videoData = [title, views, thumbnailURL, altText]
        unsortedVidList.push(videoData);
    }

    let sortedVidList = unsortedVidList.sort(function (a, b) {
        return b[1] - a[1];
    });

    let averageViews = totalViews / sortedVidList.length;
    return [totalViews, averageViews, sortedVidList];
}

export default sortResults;