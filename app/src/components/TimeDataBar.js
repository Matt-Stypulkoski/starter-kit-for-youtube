import { React } from 'react';

function TimeDataBar(props) {

    return (
        <div className="data-bar" style={{ height: `${props.freq * 2}%` }}>

        </div>
    );
}

export default TimeDataBar;
