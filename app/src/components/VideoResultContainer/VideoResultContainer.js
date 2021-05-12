import { React } from 'react';
import VideoResult from '../VideoResult/VideoResult.js';

function VideoResultContainer(props) {
    return (
        <div className="results-container" id="results-container">
            <ul className="results-list">
                {props.videoList.map(function (vidElement) {
                    // vidElement -> [title, views, thumbnailURL, altText, datetimePublished, videoId, channelTitle, channelId]
                    return <VideoResult key={vidElement[5]} title={vidElement[0]} views={vidElement[1]} thumbnailURL={vidElement[2]}
                        altText={vidElement[3]} datetimePublished={vidElement[4]} videoId={vidElement[5]} channelTitle={vidElement[6]} channelId={vidElement[7]} />
                })}
            </ul>
        </div>
    )
}

export default VideoResultContainer;