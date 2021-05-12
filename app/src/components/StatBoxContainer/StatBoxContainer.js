import { React } from 'react';
import StatBox from '../StatBox/StatBox.js';

function StatBoxContainer(props) {
    return (
        <div className="stat-box-container">
            {props.statBoxList.map(function (statBox) {
                return <StatBox value={statBox.value} label={statBox.label} />
            })}
        </div>
    );
}

export default StatBoxContainer;