import { React } from 'react';

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
            <span>(optional)</span>
        </div>
    )
}

export default DateInput;