import { React, Component } from 'react';
import DateInput from './DateInput.js';
import { youtubeSearch, youtubeSearchWithDateFilter } from '../scripts/youtubeapi.js';
import sortResults from '../scripts/sortResults.js';
import RegionSelection from './RegionSelection.js';

class InputHeader extends Component {
    constructor(props) {
        super(props)
        this.runSearch = this.runSearch.bind(this);
        this.toggleDateField = this.toggleDateField.bind(this);
        this.state = {
            useDateRange: false
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

    toggleDateField() {
        this.setState({ useDateRange: !this.state.useDateRange });
    }

    render() {
        return (
            <header className="search-header">
                <span className="search-container">
                    <input type="text" id="search-keyword" placeholder="Input Keyword Here" defaultValue="nuzlocke" />
                    <button onClick={this.runSearch}>Search</button>
                </span>
                <DateInput onChange={this.toggleDateField} useDateRange={this.state.useDateRange} />
                <RegionSelection />
            </header>
        )
    }
}

export default InputHeader;