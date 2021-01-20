import { React, Component } from 'react';
import DateInput from './DateInput.js';
import { youtubeSearch, youtubeSearchWithDateFilter } from '../scripts/youtubeapi.js';
import sortResults from '../scripts/sortResults.js';
import RegionSelection from './RegionSelection.js';
const mockData = require('../test/MockVideoResults.json');

class InputHeader extends Component {
    constructor(props) {
        super(props)
        this.runSearch = this.runSearch.bind(this);
        this.runSearchWithMockData = this.runSearchWithMockData.bind(this);
        this.toggleDateField = this.toggleDateField.bind(this);
        this.state = {
            useDateRange: false,
            testEnv: true, // If true, use mock data and don't run api
            mockData: mockData
        };
    }

    runSearch() {
        const keyword = document.getElementById("search-keyword").value;
        console.log(keyword);
        this.setState({ keyword: keyword });
        if (this.state.useDateRange) {
            const publishedAfter = document.getElementById("published-after").value;
            const publishedBefore = document.getElementById("published-before").value;

            return youtubeSearchWithDateFilter(keyword, publishedAfter, publishedBefore)
                .then(results => {
                    console.log("SEARCHED WITH DATES");
                    let viewResults = sortResults(results);
                    this.props.onSearch(viewResults[0], viewResults[1], viewResults[2]);
                })
                .catch(err => alert(err));;
        }
        return youtubeSearch(keyword)
            .then(results => {
                let viewResults = sortResults(results);
                this.props.onSearch(viewResults[0], viewResults[1], viewResults[2])
            })
            .catch(err => alert(err));
    }

    runSearchWithMockData(data) {
        let viewResults = sortResults(data);
        this.props.onSearch(viewResults[0], viewResults[1], viewResults[2]);
    }

    toggleDateField() {
        this.setState({ useDateRange: !this.state.useDateRange });
    }

    render() {
        let btn;
        if (this.state.testEnv) {
            btn = <button onClick={() => this.runSearchWithMockData(this.state.mockData)}>Search</button>
        } else {
           btn = <button onClick={this.runSearch}>Search</button>
        }
        return (
            <header className="search-header">
                <span className="search-container">
                    <input type="text" id="search-keyword" placeholder="Input Keyword Here" defaultValue="nuzlocke" />
                    {btn}
                </span>
                <DateInput onChange={this.toggleDateField} useDateRange={this.state.useDateRange} />
                <RegionSelection />
            </header>
        )
    }
}

export default InputHeader;