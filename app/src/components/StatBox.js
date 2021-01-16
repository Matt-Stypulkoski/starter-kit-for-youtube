import { React } from 'react';

function StatBox(props) {
    // Has a value and a label
    return (
        <div className="stat-box">
            <h2 className="stat-value">{props.value}</h2>
            <h4 className="stat-label">{props.label}</h4>
        </div>
    );
}

export default StatBox;