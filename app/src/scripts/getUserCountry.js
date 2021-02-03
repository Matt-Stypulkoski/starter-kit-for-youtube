import axios from 'axios'

function getUserCountry() {
    console.log('test')
    return axios.get(`http://ip-api.com/json/`, {
        params: {
            'fields': 'country,countryCode'
        }
    }).then(res => {
        console.log(res);
        return { 'country': res.data.country, 'code': res.data.countryCode };
    })
}

export default getUserCountry;