import { React } from 'react';

function VideoResult(props) {
	return (
		<li className="video-list-element">
			<div className="video-result-container">
				<div className="video-link-container">
					<a id={props.videoId} className="video-link" target="_blank" href={`https://www.youtube.com/watch?v=${props.videoId}`} rel="noreferrer">
						<img className="video-thumbnail" src={props.thumbnailURL} alt={props.altText} />
					</a>
				</div>
				<div className="video-data-container">
					<h3 className="video-title">{props.title}</h3>
					<div className="video-channel-views">
						<h4><a href={`https://www.youtube.com/channel/${props.channelId}`} target="_blank" rel="noreferrer">{props.channelTitle}</a><span> - </span>{parseInt(props.views).toLocaleString()} views</h4>
					</div>
				</div>
			</div>
		</li>
	)
}

export default VideoResult;