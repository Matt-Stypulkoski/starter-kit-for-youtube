import { React } from 'react';

function TimeDataBar(props) {
    /*
    props:
    x : for position of bar
    y : for position of bar 
    width : for width of bar (probably fixed for all bars)
    height : for height of bar (dependant on frequency of videos published that hour) 
    */

    return (
        <rect {...props}/>
    );
}

export default TimeDataBar;
