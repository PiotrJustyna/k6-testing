import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
    scenarios: {
        load_testing: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 5,
            startRate: 1,
            timeUnit: '1s',
            maxVUs: 20,
            stages: [
              { duration: '30s', target: 10 },
              { duration: '1m', target: 20 },
              { duration: '30s', target: 10}
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
    const body = 'query=dev@test.com+8.8.8.8&transactiontypeid=2';
    const res = http.post('https://localhost/emailagevalidator/v2', body, params);
    check(res, { 'status was 200': (r) => r.status == 200 });
}
function getCredentials() {
    const url = 'https://localhost/oauth/v2/token';
    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        },
    };
    var data = "grant_type=client_credentials&client_id=<SENSITIVE-DATA>>&client_secret=<SENSITIVE_DATA>>";
    var res = http.post(url, data, params);
    return JSON.parse(res.body);
}