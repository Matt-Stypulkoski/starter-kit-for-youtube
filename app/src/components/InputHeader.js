import { React, Component } from 'react';
import DateInput from './DateInput.js';
import { youtubeSearch, youtubeSearchWithDateFilter } from '../scripts/youtubeapi.js';
import sortResults from '../scripts/sortResults.js';
import RegionSelection from './RegionSelection.js';
import getUserCountry from '../scripts/getUserCountry.js';
const mockData = require('../test/MockVideoResults.json');

class InputHeader extends Component {
    constructor(props) {
        super(props)
        this.runSearch = this.runSearch.bind(this);
        this.runSearchWithMockData = this.runSearchWithMockData.bind(this);
        this.toggleDateField = this.toggleDateField.bind(this);
        this.fireOnEnter = this.fireOnEnter.bind(this);
        this.getCountry = this.getCountry.bind(this);
        this.setNewRegion = this.setNewRegion.bind(this);
        this.state = {
            useDateRange: false,
            testEnv: false, // If true, use mock data and don't run api
            mockData: mockData,
            currentRegion: null
        };
    }

    runSearch() {
        const keyword = document.getElementById("search-keyword").value;
        console.log(keyword);
        this.setState({ keyword: keyword });
        if (this.state.useDateRange) {
            const publishedAfter = document.getElementById("published-after").value;
            const publishedBefore = document.getElementById("published-before").value;

            return youtubeSearchWithDateFilter(keyword, this.state.currentRegion, publishedAfter, publishedBefore)
                .then(results => {
                    console.log("SEARCHED WITH DATES");
                    let viewResults = sortResults(results);
                    this.props.onSearch(viewResults[0], viewResults[1], viewResults[2], viewResults[3]);
                })
                .catch(err => alert(err));;
        }
        return youtubeSearch(keyword, this.state.currentRegion)
            .then(results => {
                let viewResults = sortResults(results);
                this.props.onSearch(viewResults[0], viewResults[1], viewResults[2], viewResults[3])
            })
            .catch(err => alert(err));
    }

    runSearchWithMockData(data) {
        let viewResults = sortResults(data);
        this.props.onSearch(viewResults[0], viewResults[1], viewResults[2], viewResults[3]);
    }

    toggleDateField() {
        this.setState({ useDateRange: !this.state.useDateRange });
    }

    fireOnEnter() {
        let input = document.getElementById("search-keyword");
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("search-btn").click();
            }
        })
    }

    getCountry() {
        return getUserCountry()
            .then(res => {
                this.setState({ currentRegion: res })
            })
    }

    setNewRegion(region) {
        this.setState({ currentRegion: region.name })
        console.log(region);
    }

    componentDidMount() {
        this.fireOnEnter();
        this.getCountry();
    }

    render() {
        console.log(this.state)
        let btn;
        if (this.state.testEnv) {
            btn = <button id="search-btn" onClick={() => this.runSearchWithMockData(this.state.mockData)}>Search</button>
        } else {
            btn = <button id="search-btn" onClick={this.runSearch}>Search</button>
        }
        return (
            <header className="search-header">
                <span className="search-container">
                    <input type="text" id="search-keyword" placeholder="Input Keyword Here" defaultValue="nuzlocke" />
                    {btn}
                </span>
                <DateInput onChange={this.toggleDateField} useDateRange={this.state.useDateRange} />
                <RegionSelection onRegionSelect={this.setNewRegion} currentRegion={this.state.currentRegion} />
            </header>
        )
    }
}

export default InputHeader;