function sortResults(results) {
    var totalViews = 0;
    var unsortedVidList = []
    var allTimesPublished = {}
    for (let i = 0; i < 24; i++) {
        allTimesPublished[String(i).padStart(2, '0')] = 0;
    }

    for (let vid of results) {
        const title = vid.snippet.title;

        const views = vid.statistics.viewCount
        totalViews += parseInt(views);

        const thumbnailURL = vid.snippet.thumbnails.high.url;
        const altText = `Thumbnail for video titled "${title}"`;

        const datetimePublished = vid.snippet.publishedAt;
        const timePublished = datetimePublished.match(/T(.*?):/);
        allTimesPublished[timePublished[1]] = allTimesPublished[timePublished[1]] + 1;


        let videoData = [title, views, thumbnailURL, altText, datetimePublished]
        unsortedVidList.push(videoData);
    }

    console.log(allTimesPublished);

    let sortedVidList = unsortedVidList.sort(function (a, b) {
        return b[1] - a[1];
    });

    let averageViews = totalViews / sortedVidList.length;
    return [totalViews, averageViews, sortedVidList, allTimesPublished];
}

export default sortResults;