import { React } from 'react';
import StatBox from './StatBox.js';

function StatBoxContainer(props) {
    return (
        <div className="stat-box-container">
            {props.statBoxList.map(function (statBox) {
                return <StatBox value={statBox[0]} label={statBox[1]} />
            })}
        </div>
    );
}

export default StatBoxContainer;