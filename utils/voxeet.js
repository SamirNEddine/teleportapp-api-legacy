const btoa = require('btoa');
const axios = require('axios');

const consumerKey = process.env.VOXEET_CONSUMER_KEY;
const consumerSecret = process.env.VOXEET_CONSUMER_SECRET;

const requests = {
    token: {
        method: "POST",
        url: "https://session.voxeet.com/v1/oauth2/token",
        headers: {
            'Authorization': "Basic " + btoa(encodeURI(consumerKey) + ":" + encodeURI(consumerSecret))
        },
        data: {
            grant_type: 'client_credentials'
        }
    },
    refresh: {
        method: "POST",
        url: "https://session.voxeet.com/v1/oauth2/refresh",
        headers: {
            'Authorization': "Basic " + btoa(encodeURI(consumerKey) + ":" + encodeURI(consumerSecret))
        }
    },
    invalidate: {
        method: "POST",
        url: "https://session.voxeet.com/v1/oauth2/invalidate",
        headers: {
            'Authorization': "Basic " + btoa(encodeURI(consumerKey) + ":" + encodeURI(consumerSecret))
        }
    }
};

module.exports.getVoxeetTokens = async function(){
    console.info('Getting new Voxeet access tokens');
    const response = await axios(requests.token);
    return {accessToken: response.data.access_token, refreshToken: response.data.refresh_token};
};

module.exports.refreshVoxeetToken = async function(refreshToken){
    console.info('Refreshing Voxeet access tokens');
    let request = Object.assign({}, requests.refresh);
    request.data = {
        'refresh_token': refreshToken
    };
    const response = await axios(request);
    return response.data.access_token;
};

module.exports.invalidateVoxeetAccessToken = async function (accessToken) {
    let request = Object.assign({}, requests.invalidate);
    request.data = {
        'access_token': accessToken
    };
    await axios(request);
    return 'OK';
};