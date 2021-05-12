import { React, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function DateInput(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div className="search-parameter-container">
            <div className="search-parameter-label">date range:</div>
            <div className="search-parameter-input">
                <DatePicker
                    id="published-after"
                    placeholderText="Select Start Date"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    maxDate={(endDate) ? endDate : new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    todayButton="Today"
                    autoComplete="off"
                    popperPlacement="bottom"
                />
                <DatePicker
                    id="published-before"
                    placeholderText="Select End Date"
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    maxDate={new Date()}
                    minDate={startDate}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    todayButton="Today"
                    autoComplete="off"
                    popperPlacement="bottom"
                />

            </div>
    </div>
    )
}

export default DateInput;
