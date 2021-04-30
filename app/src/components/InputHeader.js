import { React, Component } from 'react';
import DateInput from './DateInput.js';
import { youtubeSearch } from '../scripts/youtubeapi.js';
import sortResults from '../scripts/sortResults.js';
import RegionSelection from './RegionSelection.js';
const mockData = require('../test/MockVideoResults.json');

class InputHeader extends Component {
    constructor(props) {
        super(props)
        this.runSearch = this.runSearch.bind(this);
        this.runSearchWithMockData = this.runSearchWithMockData.bind(this);
        this.fireOnEnter = this.fireOnEnter.bind(this);;
        this.state = {
            testEnv: false, // If true, use mock data and don't run api
            mockData: mockData
        };
    }

    runSearch() {
        this.props.isSearching();
        const keyword = document.getElementById("search-keyword").value;
        console.log(keyword);
        this.setState({ keyword: keyword });
        let regionCode = document.getElementById("region-select").value;
        const publishedAfter = document.getElementById("published-after").value;
        const publishedBefore = document.getElementById("published-before").value;
        console.log(publishedAfter);
        console.log(publishedAfter === '')

        let searchParams = {
            'q': keyword,
            'regionCode': regionCode,
            'publishedBefore': publishedBefore,
            'publishedAfter': publishedAfter
        }

        return youtubeSearch(searchParams)
            .then(results => {
                let viewResults = sortResults(results);
                this.props.onSearch(viewResults[0], viewResults[1], viewResults[2], viewResults[3])
            })
            .catch(err => alert(err));
    }

    runSearchWithMockData(data) {
        this.props.isSearching();
        // timeout to test loading animation with mock data
        setTimeout(() => {
            let viewResults = sortResults(data);
            this.props.onSearch(viewResults[0], viewResults[1], viewResults[2], viewResults[3]);
        }, 2000);
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

    componentDidMount() {
        this.fireOnEnter();
    }

    render() {
        let btn;
        if (this.state.testEnv) {
            btn = <button id="search-btn" onClick={() => this.runSearchWithMockData(this.state.mockData)}>Search</button>
        } else {
            btn = <button id="search-btn" onClick={this.runSearch}>Search</button>
        }
        return (
            <div className="search-container">
                <div className="search-parameter-container">
                    <label className="search-parameter-label" htmlFor="search-keyword">search term:</label>
                    <input className="search-parameter-input" type="text" id="search-keyword" placeholder="Input Keyword Here" defaultValue="nuzlocke" />
                </div>
                <DateInput />
                <RegionSelection  />
                {btn}
            </div>
        )
    }
}

export default InputHeader;