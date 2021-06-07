// ***********Does not work in production***********

import axios from 'axios'

export default async function getUserCountry(cancelToken) {
    return axios.get(`http://ip-api.com/json/`, {
        cancelToken: cancelToken.token,
        params: {
            'fields': 'country,countryCode'
        }
    }).then(res => {
        return { 'country': res.data.country, 'code': res.data.countryCode };
    })
}