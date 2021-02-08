import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function DateInput(props){

    function getTodaysDate() {
        let today = new Date();
        let day = String(today.getDate()).padStart(2, '0');
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let year = today.getFullYear();
        return `${year}-${month}-${day}`
    }

    return (
        <div className="date-container">
            <span>Date Range: </span>
            <span>
                <input type="date" id="published-after" />
                <span> to </span>
                <input type="date" id="published-before" />
            </span>
            <div className="date-tooltip">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span class="tooltip-text">
                    The date parameter causes the search to
                    only return videos published between the
                    two dates. One or both fields can be left blank. 
                    If left blank, the search will not take that date
                    boundary into account.
                </span>
            </div>
        </div>
    )
}

export default DateInput;