import { React } from 'react';

function VideoResult(props) {
	
	return (
		<li className="video-list-element">
			<div className="video-result-container">
				<div className="video-data-container">
					<h3 className="video-title">{props.title}</h3>
					<h4 className="video-views">Views: {props.views}</h4>
				</div>
				<img className="video-thumbnail" src={props.thumbnailURL} alt={props.altText}/>
			</div>
		</li>
	)
}

export default VideoResult;