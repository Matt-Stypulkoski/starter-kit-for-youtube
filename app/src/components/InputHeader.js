import { React, Component } from 'react';
import DateInput from './DateInput.js';
import { youtubeSearch } from '../scripts/youtubeapi.js';
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
            useDateRange: true,
            testEnv: false, // If true, use mock data and don't run api
            mockData: mockData,
            currentRegion: null,
            regionCode: null
        };
    }

    runSearch() {
        this.props.isSearching();
        const keyword = document.getElementById("search-keyword").value;
        console.log(keyword);
        this.setState({ keyword: keyword });
        let regionCode = this.state.regionCode
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
        console.log("WAITING");
        // timeout to test loading animation with mock data
        setTimeout(() => {
            console.log("GOGOGOGO")
            let viewResults = sortResults(data);
            this.props.onSearch(viewResults[0], viewResults[1], viewResults[2], viewResults[3]);
        }, 2000);
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
                this.setState({
                    currentRegion: res.country,
                    regionCode: res.code
                })
            })
    }

    setNewRegion(region) {
        this.setState({ currentRegion: region.name, regionCode: region.id })
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
            <div className="search-container">
                <input className="search-field" type="text" id="search-keyword" placeholder="Input Keyword Here" defaultValue="nuzlocke" />
                <DateInput onChange={this.toggleDateField}/>
                <RegionSelection onRegionSelect={this.setNewRegion} currentRegion={this.state.currentRegion} />
                {btn}
            </div>
        )
    }
}

export default InputHeader;