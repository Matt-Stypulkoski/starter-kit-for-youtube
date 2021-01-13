function displayResults(results) {
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
        //const title = vid.snippet.title;
        title.innerHTML = vid.snippet.title;
        title.className = "vid-title";

        const views = document.createElement("h4");
        //const views = vid.statistics.views
        views.innerHTML = `Views: ${vid.statistics.viewCount}`;
        views.className = "vid-views";

        totalViews += parseInt(vid.statistics.viewCount);

        const thumbnailURL = document.createElement("img");
        //const thumbnailURL = vid.snippet.thumbnails.high.url;
        thumbnailURL.src = vid.snippet.thumbnails.high.url;
        thumbnailURL.alt = `Thumbnail for ${vid.snippet.title}`;
        thumbnailURL.className = "vid-thumbnail";
        //const altText = `Thumbnail for video titled ${title}`;

        //let videoResultComponent = document.createElement(VideoResult(title, views, thumbnailURL, altText));
        //let videoResultcomponent = 

        videoDataContainer.appendChild(title);
        videoDataContainer.appendChild(views);
        videoListElementContainer.appendChild(thumbnailURL);

        sortedVidList.push([videoListElement, vid.statistics.viewCount]);
        //sortedVidList.push([videoResultComponent, views]);
    }

    sortedVidList = sortedVidList.sort(function (a, b) {
        return b[1] - a[1];
    });

    for (let vidArr of sortedVidList) {
        resultsList.appendChild(vidArr[0]);
    }
    let averageViews = totalViews / sortedVidList.length;
    resultsContainer.appendChild(resultsList);
    return [totalViews, averageViews];
}

export default displayResults;