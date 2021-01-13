import { React } from 'react';

function VideoResult(props) {
	
	return (
		<div className="video-result-container">
			<div className="video-data-container">
				<h3 className="video-title">{props.title}</h3>
				<h4 className="video-views">{props.views}</h4>
			</div>
			<img src={props.thumbnailURL} alt={props.altText}/>
		</div>
	)
}

export default VideoResult;