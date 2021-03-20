import { React } from 'react';

function VideoResult(props) {
	return (
		<li className="video-list-element">
			<div className="video-result-container">
				<div className="video-link-container">
					<a id={props.videoId} className="video-link" target="_blank" onClick={() => setVideoUrl(props.videoId)}><img className="video-thumbnail" src={props.thumbnailURL} alt={props.altText} /></a>
				</div>
				<div className="video-data-container">
					<h3 className="video-title">{props.title}</h3>
					<div className="video-channel-views">
						<h4><a href={'https://www.youtube.com/channel/' + props.channelId} target="_blank">{props.channelTitle}</a><span> - </span>{parseInt(props.views).toLocaleString()} views</h4>
					</div>
				</div>
			</div>
		</li>
	)

	function setVideoUrl(videoId) {
		let videoUrl = `https://www.youtube.com/watch?v=${videoId}`
		document.getElementById(videoId).setAttribute('href', videoUrl);
    }
}

export default VideoResult;