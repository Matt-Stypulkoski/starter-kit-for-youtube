import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function DateInput(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div className="date-container">
            <span>Date Range: </span>
            <DatePicker
                id="published-after"
                placeholderText="Select Start Date"
                selected={startDate}
                onChange={date => setStartDate(date)} />
            <span> to </span>
            <DatePicker
                id="published-before"
                placeholderText="Select End Date"
                selected={endDate}
                onChange={date => setEndDate(date)} />
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