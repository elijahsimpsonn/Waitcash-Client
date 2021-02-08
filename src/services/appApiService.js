import config from '../config'
import TokenService from './tokenService'

const AppApiService = {
    getAllTips(){
        return fetch(`${config.API_ENDPOINT}/user/tips`,{
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
                'content-type':'application/json'
            },
            method: 'GET'
        }).then(res=>res.json())
    },

    postTip(tipTotal){
        return fetch(`${config.API_ENDPOINT}/user/tips`,{
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
                'content-type':'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ tip_total: tipTotal })
        }).then((res) => res.json())
    }
}

export default AppApiService