import { React } from 'react';

function VideoResult(props) {
	return (
		<li className="video-list-element">
			<div className="video-result-container">
				<div className="video-data-container">
					<h3 className="video-title">{props.title}</h3>
					<h4 className="video-views">Views: {parseInt(props.views).toLocaleString()}</h4>
				</div>
				<a id={props.videoId} target="_blank" onClick={() => setVideoUrl(props.videoId)}><img className="video-thumbnail" src={props.thumbnailURL} alt={props.altText} /></a>
			</div>
		</li>
	)

	function setVideoUrl(videoId) {
		let videoUrl = `https://www.youtube.com/watch?v=${videoId}`
		document.getElementById(videoId).setAttribute('href', videoUrl);
    }
}

export default VideoResult;