import { React } from 'react';
import VideoResult from './VideoResult.js';

function VideoResultContainer(props) {
    return (
        <div className="results-container" id="results-container">
            <ul className="results-list">
                {props.videoList.map(function (vidElement) {
                    // vidElement -> [title, views, thumbnailURL, altText, datetimePublished, videoId]
                    return <VideoResult title={vidElement[0]} views={vidElement[1]} thumbnailURL={vidElement[2]}
                                        altText={vidElement[3]} datetimePublished={vidElement[4]} videoId={vidElement[5]} />
                })}
            </ul>
        </div>
    )
}

export default VideoResultContainer;