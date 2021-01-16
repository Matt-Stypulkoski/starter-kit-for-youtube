import { React } from 'react';

function DateInput(props){

    function getTodaysDate() {
        let today = new Date();
        let day = String(today.getDate()).padStart(2, '0');
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let year = today.getFullYear();
        return `${year}-${month}-${day}`
    }

    let dateField;
    if (props.useDateRange) {
        dateField =
            <span>
                <label htmlFor="start-date">Posted After:</label>
                <input type="date" id="published-after" defaultValue={getTodaysDate()} />
                <label htmlFor="start-date">Posted Before:</label>
                <input type="date" id="published-before" defaultValue={getTodaysDate()} /> 
            </span>
    }

    return (
        <div>
            <label htmlFor="use-date">Filter by Date Range:</label>
            <input type="checkbox" id="use-date" onChange={() => props.onChange()} />
            {dateField}
        </div>
    )
}

export default DateInput;