import axios from 'axios'

function getUserCountry() {
    console.log('test')
    return axios.get(`http://ip-api.com/json/`, {
        params: {
            'fields': 'country'
        }
    }).then(res => {
        console.log(res);
        return res.data.country;
    })
}

export default getUserCountry;