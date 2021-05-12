import { React } from 'react';
import StatBox from '../StatBox/StatBox.js';

function StatBoxContainer(props) {
    return (
        <div className="stat-box-container">
            {props.statBoxList.map(function (statBox, idx) {
                return <StatBox value={statBox.value} label={statBox.label} key={idx}/>
            })}
        </div>
    );
}

export default StatBoxContainer;