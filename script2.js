import http from 'k6/http';
import { check } from 'k6';
export const options = {
    scenarios: {
        spike_testing: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 10,
            startRate: 1,
            timeUnit: '1s',
            maxVUs: 80,
            stages: [
              { duration: '30s', target: 10 },
              { duration: '1m', target: 10 },
              { duration: '30s', target: 20},
              { duration: '1m', target: 20},
              { duration: '30s', target: 40},
              { duration: '1m', target: 40}              
            ]      
        }        
    }
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
            'User-Agent': 'PostmanRuntime/7.29.0',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    };
    const body = 'query=test@dev.com+8.8.8.8&transactiontypeid=2';
    const res = http.post('<DEV_APIURL_HERE>', body, params);
    check(res, { 'status was 200': (r) => r.status == 200 });
}
function getCredentials() {
    const url = '<DEV_API_AUTH_URL_HERE>';
    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        },
    };
    var data = "grant_type=client_credentials&client_id=<SENSITIVE>&client_secret=<SENSITIVE>";
    var res = http.post(url, data, params);
    return JSON.parse(res.body);
}