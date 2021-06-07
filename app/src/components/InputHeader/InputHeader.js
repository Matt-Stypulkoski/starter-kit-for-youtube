import { React, Component } from 'react';
import DateInput from '../DateInput/DateInput.js';
import { youtubeSearch } from '../../js/youtubeapi.js';
import sortResults from '../../js/sortResults.js';
import RegionSelection from '../RegionSelection/RegionSelection.js';

class InputHeader extends Component {
    constructor(props) {
        super(props)
        this.runSearch = this.runSearch.bind(this);
        this.fireOnEnter = this.fireOnEnter.bind(this);;
    }

    runSearch() {    
        const keyword = document.getElementById("search-keyword").value;
        if (keyword === "") {
            return alert("You must input a keyword to search for.");
        }
        this.props.isSearching();
        this.setState({ keyword: keyword });
        let regionCode = document.getElementById("region-select").value;
        const publishedAfter = document.getElementById("published-after").value;
        const publishedBefore = document.getElementById("published-before").value;

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
        let btn = <button id="search-btn" onClick={this.runSearch}>Search</button>
        return (
            <div className="search-container">
                <div className="search-parameter-container">
                    <label className="search-parameter-label" htmlFor="search-keyword">search term:</label>
                    <input className="search-parameter-input" type="text" id="search-keyword" placeholder="Input Keyword Here" />
                </div>
                <DateInput />
                <RegionSelection  />
                {btn}
            </div>
        )
    }
}

export default InputHeader;