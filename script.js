import http from 'k6/http';
import { check, sleep } from 'k6';

 
export const options = {
    stages: [
        // { duration: '30s', target: 20 },
        // { duration: '1m30s', target: 10 },
        { duration: '3s', target: 10 },
    ],
};

export function setup() {
var creds = getCredentials();
   
    return creds;
}

export default function (data) {
   
const params = {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + data.access_token,
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        },
};
    const body = 'query=test@email.com+8.8.8.8&transactiontypeid=2';

    const res = http.post('http://<machine ip>:5001/emailagevalidator/v2', body, params);
     
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}

function getCredentials() {

    const url = '<CREDENTIALS_URL>';
    const params = {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        },
    };

    var data = "grant_type=client_credentials&client_id=<CLIENT_ID>&client_secret=<CLIENT_SECRET>";
 
    var res = http.post(url, data, params);

    return JSON.parse(res.body);;
}
